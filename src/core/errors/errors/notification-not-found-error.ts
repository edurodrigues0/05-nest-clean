import { UseCaseError } from '@/core/errors/use-case-error'

export class NotificationNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Notification not found.')
  }
}
