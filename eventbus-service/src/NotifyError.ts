export class NotifyError extends Error {
  constructor(public message: string, public listenerAddress: string) {
    super(message)

    // "Hack" pro instanceof funcionar
    Object.setPrototypeOf(this, NotifyError.prototype)
  }
}
