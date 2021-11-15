import { BaseMessage } from './base-message'
import { MessageType } from './message-types'

export type AuthenticateFailureMessage = BaseMessage<MessageType.AuthenticateFailure> & {
  message: string
}
