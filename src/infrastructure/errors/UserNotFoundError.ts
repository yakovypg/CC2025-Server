import { NotFoundError } from "./";

export default class UserNotFoundError extends NotFoundError {
  constructor(message?: string) {
    super(message ?? 'User not found');
    this.name = 'UserNotFoundError';
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
