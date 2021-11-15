import { BaseMessage } from './base-message'
import { MessageType } from './message-types'

export type GenericErrorMessage = BaseMessage<MessageType.GenericError> & {
  message: string
}
