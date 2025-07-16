export default class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? "Resource not found");
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
