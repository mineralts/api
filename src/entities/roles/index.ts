import { Snowflake } from '../../types'
import Guild from '../guild/Guild'

export default class Role {
  constructor (
    private id: Snowflake,
    private name: string,
    private unicodeEmoji: string | null,
    private position: number,
    private permissions: string,
    private mentionable: boolean,
    private managed: boolean,
    private icon: any,
    private hoist: boolean,
    private color: number,
    private guild: Guild
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getName (): string {
    return this.name
  }

  public getUnicodeEmoji (): string | null {
    return this.unicodeEmoji
  }

  public getPosition (): number {
    return this.position
  }

  public getPermissions (): string {
    return this.permissions
  }

  public isMentionable (): boolean {
    return this.mentionable
  }

  public isManaged (): boolean {
    return this.managed
  }

  public getIcon (): string {
    return this.icon
  }

  public getHoist (): boolean {
    return this.hoist
  }

  public getColor (): number {
    return this.color
  }

  public getGuild (): Guild {
    return this.guild
  }
}