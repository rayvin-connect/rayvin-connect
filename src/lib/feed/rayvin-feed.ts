import {RayvinClient} from '../api/rayvin-client'
import {extractErrorMessage} from "../api/helpers/api-helpers"
import axios from "axios"
import {Moment, utc} from "moment-timezone"
import {WrappedMessage} from "./messages/wrapped-message"
import {MessageType} from "./messages/message-types"
import {MomentListedData} from "./messages/moment-listed-message"
import {MomentWithdrawnData} from "./messages/moment-withdrawn-message"
import {MomentPurchasedData} from "./messages/moment-purchased-message"
import IsoWebSocket from "isomorphic-ws"

const PING_INTERVAL = 30000
const WEBSOCKET_CLIENT_VERSION = 11

interface Events {
  'pong': {
    // time it took for the ping response to return
    pingTime: number
  }
  'moment-listed': MomentListedData
  'moment-withdrawn': MomentWithdrawnData
  'moment-purchased': MomentPurchasedData
  'error': {
    // error message returned by the server
    error: string
  }
  'disconnected': {}
  'connected': {}
}

type AuthData = {
  endpoint: string
  authToken: string
}

type Listener<T extends keyof Events> = (ev: Events[T]) => void

export class RayvinFeed {
  private ws?: WebSocket
  private isConnecting = false
  private isConnected = false
  private isAuthenticating = false

  private lastConnectedAt?: Moment = undefined

  private hasAuthenticated = false
  private error?: string

  private connectInterval?: NodeJS.Timeout
  private pingInterval?: NodeJS.Timeout
  private pulseInterval?: NodeJS.Timeout

  private authData: AuthData | undefined

  private pingTime: number | undefined = undefined
  private pingSent = false
  private numberOfPingMisses = 0

  private listeners = {
    'pong': [] as Listener<'pong'>[],
    'moment-listed': [] as Listener<'moment-listed'>[],
    'moment-withdrawn': [] as Listener<'moment-withdrawn'>[],
    'moment-purchased': [] as Listener<'moment-purchased'>[],
    'error': [] as Listener<'error'>[],
    'connected': [] as Listener<'connected'>[],
    'disconnected': [] as Listener<'disconnected'>[],
  }

  // add an event listener for feed events
  on<K extends keyof Events>(s: K, listener: (ev: Events[K]) => void): void {
    this.listeners[s].push(listener as any)
  }

  private emit<K extends keyof Events>(s: K, ev: Events[K]): any {
    for (const listener of this.listeners[s]) {
      listener(ev as any)
    }
  }

  constructor(private readonly client: RayvinClient) {
  }

  // disconnect from the feed
  disconnect() {
    this.ws?.close()
    this.ws = undefined
    if (this.connectInterval) {
      clearInterval(this.connectInterval)
      this.connectInterval = undefined
    }

    if (this.pingInterval) {
      clearInterval(this.pingInterval)
      this.pingInterval = undefined
      this.numberOfPingMisses = 0
      this.pingSent = false
    }

    if (this.pulseInterval) {
      clearInterval(this.pulseInterval)
      this.pulseInterval = undefined
    }

    this.isConnecting = false
    this.isConnected = false
    this.hasAuthenticated = false
    this.isAuthenticating = false

    this.emit('disconnected', {})
  }

  private ping() {
    if (this.ws) {
      if (this.pingSent) {
        if (++this.numberOfPingMisses > 2) {
          this.setError('Timeout')
          this.disconnect()
        }
      } else {
        try {
          this.numberOfPingMisses = 0
          this.pingSent = true
          this.ws.send(JSON.stringify({type: 'ping', timestamp: new Date().getTime()}))
        } catch (err) {
          this.disconnect()
        }
      }
    }
  }

  private async authenticate() {
    if (!this.isAuthenticating && !this.hasAuthenticated) {
      this.isAuthenticating = true

      try {
        const response = await this.client.getFeedAuthToken()

        this.authData = {
          endpoint: response.endpoint,
          authToken: response.authToken,
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          this.setError(extractErrorMessage(err.response))
        } else {
          this.setError('Unable to connect to server')
        }

        this.disconnect()
      }
    }
  }

  private setError(message?: string) {
    this.error = message

    if (message) {
      this.emit('error', {error: message})
    }
  }

  // connect to the feed
  async connect() {
    if (!this.ws) {
      this.isConnecting = true

      await this.authenticate()

      if (this.authData) {
        this.ws = new IsoWebSocket(this.authData.endpoint) as WebSocket

        this.ws.onopen = () => {
          this.isConnected = true
          this.isConnecting = false
          this.error = undefined

          this.lastConnectedAt = utc()

          this.ws!.send(JSON.stringify({
            type: 'auth',
            authToken: this.authData?.authToken,
            clientVersion: WEBSOCKET_CLIENT_VERSION,
          }))

          this.pingSent = false
          this.numberOfPingMisses = 0
          this.pingInterval = setInterval(() => this.ping(), PING_INTERVAL)

          this.emit('connected', {})
        }

        this.ws.onmessage = event => {
          const message: WrappedMessage = JSON.parse(event.data)
          const data = message.data

          if (data?.type === MessageType.AuthenticateSuccess) {
            this.isAuthenticating = false
            this.hasAuthenticated = true
            this.pingSent = false
            this.numberOfPingMisses = 0

            this.ping()
          } else if (data?.type === MessageType.AuthenticateFailure) {
            this.isAuthenticating = false
            this.setError(data.message ?? 'Unable to authenticate with server')
            this.disconnect()
          } else if (data?.type === MessageType.DuplicateSessionError) {
            this.setError('Duplicate session')
            this.disconnect()
          } else if (data?.type === MessageType.GenericError) {
            this.setError(data.message)
            this.disconnect()
          } else if (data?.type === MessageType.PongMessage) {
            this.numberOfPingMisses = 0
            this.pingSent = false
            const pingTime = new Date().getTime() - data.timestamp
            this.pingTime = pingTime

            this.emit('pong', {pingTime})
          } else if (data?.type === MessageType.MomentListed) {
            this.emit('moment-listed', data.data)
          } else if (data?.type === 'moment-withdrawn') {
            this.emit('moment-withdrawn', data.data)
          } else if (data?.type === 'moment-purchased') {
            this.emit('moment-purchased', data.data)
          }
        }

        this.ws.onclose = () => {
          this.disconnect()
        }

        this.ws.onerror = () => {
          this.disconnect()
        }
      } else {
        this.isConnecting = false
      }
    }
  }
}
