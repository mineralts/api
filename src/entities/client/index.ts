import { Collection } from '@mineralts/core'
import { ClientOptions, Snowflake } from '../../types'
import User from '../user'
import Presence from '../presence'
import Command from '../../command/Command'

export default class Client {
  constructor (
    private container: any,
    public readonly token: string,
    private options: ClientOptions,
    public readonly user: User,
    public readonly sessionId: string,
    public readonly presences: Presence[],
    public readonly application: { id: string, flags: number },
    public commands: Collection<Snowflake, Command> = new Collection()
  ) {
  }
}