import { WsClientMessage } from './message-types'

export type WrappedMessage = {
  timestamp: number
  data: WsClientMessage
}
