import { MessageType } from './message-types'

export type BaseMessage<T extends MessageType> = {
  type: T
}
