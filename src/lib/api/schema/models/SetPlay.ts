import { Set } from './Set'
import { Play } from './Play'

export type SetPlay = {
  // set for this set play
  set: Set
  // play for this set play
  play: Play
  // circulation count
  circulationCount: number
  // whether or not this set play is retired (this means it is LE)
  isRetired: boolean
}
