export type GetFeedAuthTokenResponse = {
  // WebSocket endpoint to connect to for the real-time feed
  endpoint: string
  // auth token to use when connecting to the real-time feed
  authToken: string
}
