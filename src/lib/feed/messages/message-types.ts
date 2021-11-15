import { PongMessage } from './pong-message'
import { AuthenticateSuccessMessage } from './authenticate-success-message'
import { AuthenticateFailureMessage } from './authenticate-failure-message'
import { DuplicateSessionErrorMessage } from './duplicate-session-error-message'
import { MomentListedMessage } from './moment-listed-message'
import { MomentWithdrawnMessage } from './moment-withdrawn-message'
import { MomentPurchasedMessage } from './moment-purchased-message'
import { GenericErrorMessage } from './generic-error-message'

export enum MessageType {
  PongMessage = 'pong',
  AuthenticateSuccess = 'auth-success',
  AuthenticateFailure = 'auth-failure',
  DuplicateSessionError = 'duplicate-session',
  MomentListed = 'moment-listed',
  MomentWithdrawn = 'moment-withdrawn',
  MomentPurchased = 'moment-purchased',
  GenericError = 'error',
}

export type WsClientMessage = PongMessage
  | AuthenticateSuccessMessage
  | AuthenticateFailureMessage
  | DuplicateSessionErrorMessage
  | MomentListedMessage
  | MomentWithdrawnMessage
  | MomentPurchasedMessage
  | GenericErrorMessage
