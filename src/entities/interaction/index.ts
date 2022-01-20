import { ComponentType, InteractionType, Snowflake } from '../../types'
import Message from '../message'
import GuildMember from '../guild/GuildMember'
import Guild from '../guild/Guild'

export default class Interaction {
  constructor (
    protected id: Snowflake,
    protected version: number,
    protected type: keyof typeof InteractionType,
    protected token: string,
    protected customId: string | undefined,
    protected componentType: keyof typeof ComponentType | undefined,
    protected message: Message | undefined,
    protected member: GuildMember
  ) {
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

  public getCustomId (): string | undefined {
    return this.customId
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

  public getGuild (): Guild {
    return this.member.getGuild()
  }
}