import Collection from '../../utils/Collection'
import GuildMember from './GuildMember'
import { Snowflake } from '../../types'

export default class GuildMemberManager {
  private cache: Collection<Snowflake, GuildMember> = new Collection()

  public register (guildMembers: Collection<Snowflake, GuildMember>) {
    this.cache = guildMembers
    return this
  }

  public getCache (): Collection<Snowflake, GuildMember> {
    return this.cache
  }
}