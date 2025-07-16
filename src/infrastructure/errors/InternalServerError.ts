export default class InternalServerError extends Error {
  constructor(message?: string) {
    super(message ?? "Internal server error");
    this.name = "InternalServerError";
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
