import {
  ComponentType,
  InteractionType,
  MessageComponentResolvable,
  MessageOption,
  Snowflake
} from '../../types'
import Message from '../message'
import GuildMember from '../guild/GuildMember'
import Application from '@mineralts/application'
import EmbedRow from '../embed/EmbedRow'
import CommandOptions from './CommandOptions'

export default class CommandInteraction {
  constructor (
    private id: Snowflake,
    private version: number,
    private type: keyof typeof InteractionType,
    private token: string,
    private customId: string | undefined,
    private componentType: keyof typeof ComponentType | undefined,
    private message: Message | undefined,
    private member: GuildMember,
    private params: any,
    private commandOptions: CommandOptions
  ) {
    this.commandOptions = new CommandOptions(this.params, this.member)
  }

  public getId (): Snowflake {
    return this.id
  }

  public getVersion (): number {
    return this.version
  }

  public getType (): keyof typeof InteractionType {
    return this.type
  }

  public getToken (): string {
    return this.token
  }

  public getComponentType (): keyof typeof ComponentType | undefined {
    return this.componentType
  }

  public getMessage (): Message | undefined {
    return this.message
  }

  public getSender (): GuildMember {
    return this.member
  }

  public getParams (): any {
    return this.params
  }

  public async reply (messageOption: MessageOption): Promise<void> {
    const request = Application.createRequest()
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson()
      }) as any[]
      return row
    })

    await request.post(`/interactions/${this.id}/${this.token}/callback`, {
      type: InteractionType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        ...messageOption,
        components,
        flags: messageOption.private ? 1 << 6 : undefined,
      }
    })
  }

  public getOptions (): CommandOptions {
    return this.commandOptions
  }
}