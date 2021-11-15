export type GetActiveListingsRequest = {
  // set to retrieve listings for (this is the flow ID of the set)
  set: number
  // play to retrieve listings for (this is the flow ID of the play)
  play: number
  // minimum serial number to retrieve
  minSerial?: number
  // maximum serial number to retrieve
  maxSerial?: number
  // minimum price of listings to retrieve
  minPrice?: number
  // maximum price of listings to retrieve
  maxPrice?: number
  // earliest date to return listings for
  fromDate?: string
  // latest date to return listings for
  toDate?: string
  // limit the number of results returned (defaults to 100, max is 500)
  limit?: number
  // cursor to use when paginating results. this value will be provided in the response so you can request the next set of results
  cursor?: string
}

export const GetActiveListingsRequestSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    set: {
      type: 'number',
    },
    play: {
      type: 'number',
    },
    minSerial: {
      type: 'number',
    },
    maxSerial: {
      type: 'number',
    },
    minPrice: {
      type: 'number',
    },
    maxPrice: {
      type: 'number',
    },
    fromDate: {
      type: 'date-time',
    },
    toDate: {
      type: 'date-time',
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
  required: ['set', 'play'],
}
