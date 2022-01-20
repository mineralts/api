import Collection from '../../utils/Collection'
import { ClientOptions, Snowflake } from '../../types'
import User from '../user'
import Presence from '../presence'
import Command from '../../command/Command'
import { GuildManager } from '../../../index'
import Application from '@mineralts/application'
import { MineralCommand } from '@mineralts/core'
import { CommandContext } from '@mineralts/assembler'
import { Assembler } from '@mineralts/assembler'
import { serializeCommand } from '../../utils'

export default class Client {
  public guilds: GuildManager = new GuildManager()

  constructor (
    private container: any,
    private token: string,
    private options: ClientOptions,
    private user: User,
    private sessionId: string,
    private presences: Presence[],
    private application: { id: string, flags: number },
    private commands: Collection<Snowflake, Command> = new Collection(),
  ) {
  }

  public getOptions (): ClientOptions {
    return this.options
  }

  public getToken (): string {
    return this.token
  }

  public getUser (): User {
    return this.user
  }

  public getSessionId (): string {
    return this.sessionId
  }

  public getPresences (): Presence[] {
    return this.presences
  }

  public getApplication (): { id: string, flags: number } {
    return this.application
  }

  public getCommands (): Collection<Snowflake, Command> {
    return this.commands
  }
  
  public async registerGlobalCommands (assembler: Assembler) {
    const request = Application.createRequest()
    const commandContainer = assembler.application.container.commands
    const commands = commandContainer.filter((command: MineralCommand & { data: CommandContext }) => (
      command.data.scope == 'GLOBAL'
    ))

    await Promise.all(
      commands.map(async (command: MineralCommand & { data: CommandContext }) => {
        await request.post(`/applications/${this.application.id}/commands`, {
          ...serializeCommand(command.data)
        })
      })
    )
  }
}