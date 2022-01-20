import Collection from '../../utils/Collection'
import { Snowflake } from '../../types'
import Guild from '../guild/Guild'

export default class Index {
  protected cache: Collection<Snowflake, Guild> = new Collection()

  public getCache (): Collection<Snowflake, Guild> {
    return this.cache
  }
}