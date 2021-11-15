export type SendNotificationRequest = {
  // the subject that will be used for email notifications (this will default to a standard subject line if you do not provide a value)
  subject?: string
  /// the message this will be included in the body of the email/Telegram message
  message: string
}
