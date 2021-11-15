import { Set } from './models/Set'

export type GetSetsResponse = {
  // sets returned from the API
  sets: Set[]
  // cursor to use to fetch the next set of results
  cursor: string
}
