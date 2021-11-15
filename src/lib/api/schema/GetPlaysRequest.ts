export type GetPlaysRequest = {
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}

export const GetPlaysRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    limit: {
      type: 'number',
      minimum: 1,
      maximum: 500,
    },
    cursor: {
      type: 'string',
    },
  },
}
