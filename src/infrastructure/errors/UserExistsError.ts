export default class UserExistsError extends Error {
  constructor(message?: string) {
    super(message ?? 'User already exists');
    this.name = 'UserExistsError';
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}
