import { DateTime } from 'luxon'

export default class RateLimit {
  constructor (
    private message: string,
    private retryAfter: DateTime,
    private global: boolean,
  ) {
  }

  public getMessage (): string {
    return this.message
  }

  public getTimeout (): DateTime {
    return this.retryAfter
  }

  public isGlobal (): boolean {
    return this.global
  }
}