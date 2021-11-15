import {BaseMessage} from './base-message'
import {MessageType} from './message-types'

export type MomentWithdrawnData = {
  // timestamp of when this message was sent by the server
  timestamp: number
  // block height of the transaction that emitted this event on the blockchain
  blockHeight: number
  // moment data
  moment: {
    // flow blockchain id of the moment that was withdrawn
    flowId: number
  }
}

export type MomentWithdrawnMessage = BaseMessage<MessageType.MomentWithdrawn> & {
  data: MomentWithdrawnData
}
