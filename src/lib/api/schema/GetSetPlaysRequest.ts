export type GetSetPlaysRequest = {
  // limit results to specified sets (these are the flow IDs of the sets)
  sets?: number[]
  // limit results to specified plays (these are the flow IDs of the plays)
  plays?: number[]
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}

export const GetSetPlaysRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    sets: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
    plays: {
      type: 'array',
      items: {
        type: 'number',
      },
    },
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
