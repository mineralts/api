import { ClientOptions, Intent } from '../../types'

export default class Client {
  constructor (private container: any, public readonly token: string, private options: ClientOptions) {
  }

  private getIntentValue () {
    return this.options.intents
      ? this.options.intents === 'ALL'
        ? Intent[this.options.intents]
        : this.options.intents.reduce((acc: number, current: keyof typeof Intent) => acc + Intent[current], 0)
      : 0
  }
}