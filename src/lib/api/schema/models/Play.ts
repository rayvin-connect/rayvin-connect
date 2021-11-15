export type Play = {
  // id of this play on the Flow blockchain
  flowId: number
  // category of the play (ie: Dunk)
  playCategory: string
  // jersey number of the player for this play
  jerseyNumber: number
  // player's full name
  playerName: string
  // ID for this play on Top Shot (used in Top Shot URLs)
  externalId: string | null
  // league (ie: NBA, WNBA)
  league: string | null
  // the date for the moment (in ISO 8601 format)
  dateOfMoment: string
}
