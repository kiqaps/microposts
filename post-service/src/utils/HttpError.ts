export class HttpError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message)

    // "Hack" pro instanceof funcionar
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}
