import GuildMember from '../guild/GuildMember'
import { DateTime } from 'luxon'
import { ChannelResolvable } from '../../types'

export default class Invite {
  constructor (
    private owner: GuildMember,
    private channel: ChannelResolvable,
    private code: string,
    private count: number,
    private max: number,
    private temporary: boolean,
    private expireAt: DateTime,
    private createdAt: DateTime,
  ) {
  }

  public getOwner (): GuildMember {
    return this.owner
  }

  public getChannel (): ChannelResolvable {
    return this.channel
  }

  public getCode (): string {
    return this.code
  }

  public getUses (): number {
    return this.count
  }

  public getMaxUses (): number {
    return this.max
  }

  public isTemporary (): boolean {
    return this.temporary
  }

  public getCreatedAt (): DateTime {
    return this.createdAt
  }

  public getExpiredAt (): DateTime {
    return this.expireAt
  }
}