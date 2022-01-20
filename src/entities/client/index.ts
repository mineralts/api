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
    public container: any,
    public token: string,
    public options: ClientOptions,
    public user: User,
    public sessionId: string,
    public presences: Presence[],
    public application: { id: string, flags: number },
    public commands: Collection<Snowflake, Command> = new Collection(),
  ) {
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