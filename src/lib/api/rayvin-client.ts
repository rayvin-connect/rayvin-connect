import axios from "axios";
import { GetFeedAuthTokenResponse } from "./schema/GetFeedAuthTokenResponse";
import { SendNotificationRequest } from './schema/SendNotificationRequest'
import { GetSetsRequest } from './schema/GetSetsRequest'
import { GetSetsResponse } from './schema/GetSetsResponse'
import { GetPlaysRequest } from './schema/GetPlaysRequest'
import { GetPlaysResponse } from './schema/GetPlaysResponse'
import { GetSetPlaysRequest } from './schema/GetSetPlaysRequest'
import { GetSetPlaysResponse } from './schema/GetSetPlaysResponse'
import { GetActiveListingsRequest } from './schema/GetActiveListingsRequest'
import { GetActiveListingsResponse } from './schema/GetActiveListingsResponse'

type Options = {
  endpoint?: string
}

export class RayvinClient {
  private readonly endpoint: string

  constructor (private readonly apiKey: string, options?: Options) {
    this.endpoint = options?.endpoint ?? 'https://api.prod.rayvin.io/connect/v1/';
  }

  getInstance () {
    let params = {
      maxContentLength: 500000,
      timeout: 60000,
    }

    const headers: any = {}

    headers['x-connect-api-key'] = this.apiKey

    return axios.create({
      ...params,
      baseURL: this.endpoint,
      headers: headers,
    })
  }

  async getFeedAuthToken (): Promise<GetFeedAuthTokenResponse> {
    const response = await this.getInstance().post<GetFeedAuthTokenResponse>('/feed/auth-token')
    return response.data
  }

  async sendNotification (request: SendNotificationRequest): Promise<void> {
    await this.getInstance().post('/notification', { subject: request.subject, message: request.message })
  }

  async getSets (request: GetSetsRequest): Promise<GetSetsResponse> {
    return this.performDataQuery<GetSetsRequest, GetSetsResponse>('/data/sets', request)
  }

  async getPlays (request: GetPlaysRequest): Promise<GetPlaysResponse> {
    return this.performDataQuery<GetPlaysRequest, GetPlaysResponse>('/data/plays', request)
  }

  async getSetPlays (request: GetSetPlaysRequest): Promise<GetSetPlaysResponse> {
    return this.performDataQuery<GetSetPlaysRequest, GetSetPlaysResponse>('/data/set-plays', request)
  }

  async getActiveListings (request: GetActiveListingsRequest): Promise<GetActiveListingsResponse> {
    return this.performDataQuery<GetActiveListingsRequest, GetActiveListingsResponse>('/data/active-listings', request)
  }

  private async performDataQuery<R, T> (url: string, request: R): Promise<T> {
    const response = await this.getInstance().post<T>(url, request)
    return response.data
  }
}
