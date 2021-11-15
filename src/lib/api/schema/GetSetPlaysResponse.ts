import { SetPlay } from './models/SetPlay'

export type GetSetPlaysResponse = {
  // set plays returned by the API
  setPlays: SetPlay[]
  // cursor used for requesting the next page of results
  cursor: string
}
