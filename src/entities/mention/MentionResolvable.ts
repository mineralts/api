import { Snowflake } from '../../types'
import Role from '../roles'
import { Collection } from '@mineralts/core'
import GuildMember from '../guild/GuildMember'
import Channel from '../channels/Channel'

export class MentionResolvable {
  constructor (
    public isEveryone: boolean,
    public roles: Collection<Snowflake, Role>,
    public members: Collection<Snowflake, GuildMember>,
    public channels: Collection<Snowflake, Channel>
  ) {
  }
}