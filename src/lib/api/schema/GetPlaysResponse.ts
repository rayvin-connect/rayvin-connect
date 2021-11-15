import { Play } from './models/Play'

export type GetPlaysResponse = {
  // plays returned from the API
  plays: Play[]
  // cursor to use to fetch the next set of results
  cursor: string
}
