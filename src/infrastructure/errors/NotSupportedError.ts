export default class NotSupportedError extends Error {
  constructor(message?: string) {
    super(message ?? 'Operation not supported');
    this.name = 'NotSupportedError';
    Object.setPrototypeOf(this, NotSupportedError.prototype);
  }
}
