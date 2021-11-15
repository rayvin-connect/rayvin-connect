export type Set = {
  // Id of this set on the Flow blockchain
  flowId: number
  // name of the set (can be null if no name has been found)
  name: string | null
  // ID for this set on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // series number
  series: number
  // name of the series
  seriesName: string | null
  // visual id of the set (ie: SET_VISUAL_LEGENDARY)
  visualId: string | null
}
