import { BaseMessage } from './base-message'
import { MessageType } from './message-types'

export type PongMessage = BaseMessage<MessageType.PongMessage> & {
  timestamp: number
}
