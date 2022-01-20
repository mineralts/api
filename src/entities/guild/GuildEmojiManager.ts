import Collection from '../../utils/Collection'
import { Snowflake } from '../../types'
import Emoji from '../emoji'

export default class GuildEmojiManager {
  private cache: Collection<Snowflake, Emoji> = new Collection()

  public register (emojis: Collection<Snowflake, Emoji>) {
    this.cache = emojis
    return this
  }

  public getCache (): Collection<Snowflake, Emoji>  {
    return this.cache
  }
}