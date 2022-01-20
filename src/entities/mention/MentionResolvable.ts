import { Snowflake } from '../../types'
import Role from '../roles'
import Collection from '../../utils/Collection'
import GuildMember from '../guild/GuildMember'
import Channel from '../channels/Channel'

export default class MentionResolvable {
  constructor (
    private everyone: boolean,
    private roles: Collection<Snowflake, Role>,
    private members: Collection<Snowflake, GuildMember>,
    private channels: Collection<Snowflake, Channel>
  ) {
  }

  public isEveryone (): boolean {
    return this.everyone
  }

  public getRoles (): Collection<Snowflake, Role> {
    return this.roles
  }

  public getMembers (): Collection<Snowflake, GuildMember> {
    return this.members
  }

  public getChannels (): Collection<Snowflake, Channel> {
    return this.channels
  }
}