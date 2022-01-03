import Collection from '../../utils/Collection'
import { Snowflake } from '../../types'
import Guild from '../guild/Guild'

export default class Index {
  public cache: Collection<Snowflake, Guild> = new Collection()
}