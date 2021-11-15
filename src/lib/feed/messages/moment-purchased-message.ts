import {BaseMessage} from './base-message'
import {MessageType} from './message-types'

export type MomentPurchasedData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // moment data
  moment: {
    // flow id of the moment that was purchased
    flowId: number
    // serial number of the moment that was purchased
    serialNumber: number
  }
  // purchase data
  purchase: {
    // purchase price of the moment (in USD)
    price: number
    // buyer data
    buyer: {
      // flow address of the buyer (no leading 0x)
      flowAddress: string
      // Top Shot username of the buyer (if available)
      topShotUsername: string | null
    }
  }
  // set data
  set: {
    // flow id of the set
    flowId: number
  }
  // play data
  play: {
    // flow id of the play
    flowId: number
  }
}

export type MomentPurchasedMessage = BaseMessage<MessageType.MomentPurchased> & {
  data: MomentPurchasedData
}
