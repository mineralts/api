import Collection from '../../utils/Collection'
import { Snowflake } from '../../types'
import Role from '../roles'

export default class GuildRoleManager {
  public cache: Collection<Snowflake, Role> = new Collection()

  public register (roles: Collection<Snowflake, Role>) {
    roles.forEach((role: Role) => {
      this.cache.set(role.id, role)
    })
    return this
  }
}