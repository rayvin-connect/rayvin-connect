import { BaseMessage } from './base-message'
import { MessageType } from './message-types'

export type MomentListedData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // listing data
  listing: {
    // price of the listing (in USD)
    price: number
    // seller data
    seller: {
      // flow address of the seller (no leading 0x)
      flowAddress: string
      // top shot username of the seller (if available)
      topShotUsername: string | null
    }
  }
  // moment data
  moment: {
    // id of the moment on the Flow blockchain
    flowId: number
    // serial number of the moment
    serialNumber: number
    // ID for this moment on Top Shot (used in Top Shot URLs)
    externalId: string
  }
  // set data
  set: {
    // id of the set on the Flow blockchain
    flowId: number
    // name of the set (can be null if no name has been found)
    name: string
    // series number
    series: number
    // name of the series
    seriesName: string | null
    // visual id of the set (ie: SET_VISUAL_LEGENDARY)
    visualId: string
    // ID for this set on Top Shot (used in Top Shot URLs)
    externalId: string
  }
  // play data
  play: {
    // id of this play on the Flow blockchain
    flowId: number
    // player's full name
    playerName: string
    // category of the play (ie: Dunk)
    playCategory: string
    // jersey number of the player for this play
    jerseyNumber: number
    // ID for this play on Top Shot (used in Top Shot URLs)
    externalId: string
    // league (ie: NBA, WNBA)
    league: string
  }
  // set play data
  setPlay: {
    // circulation count
    circulationCount: number
    // whether or not this set play is retired (this means it is LE)
    isRetired: boolean
  }
  // tags for the listing
  tags: {
    // id of the tag on Top Shot
    id: string
    // title of the tag
    title: string
  }[]
  // if the lowest ask changed with this listing, the previous lowest ask will be provided here
  previousLowestAsk?: number
  // current lowest ask
  lowestAsk?: number
}

export type MomentListedMessage = BaseMessage<MessageType.MomentListed> & {
  data: MomentListedData
}
