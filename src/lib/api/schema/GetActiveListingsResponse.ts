import { ActiveListing } from './models/ActiveListing'

export type GetActiveListingsResponse = {
  // active listings returned from the API
  activeListings: ActiveListing[]
  // total number of listings that matched the query
  total: number
  // cursor to use for requested the next page of results
  cursor: string
}
