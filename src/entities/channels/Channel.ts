import { ChannelTypeResolvable, RequestOptions, Snowflake } from '../../types'
import Guild from '../guild/Guild'
import CategoryChannel from './CategoryChannel'

export default class Channel {
  constructor (
    public id: Snowflake,
    public type: keyof typeof ChannelTypeResolvable,
    public name: string,
    public guildId: Snowflake,
    public guild: Guild | undefined,
    public parentId: Snowflake | undefined,
    public position: number,
    public parent?: CategoryChannel,
  ) {
  }

  public isText () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_TEXT
      || ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_NEWS
  }

  public isVoice () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_VOICE
  }

  public isNews () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_NEWS
  }

  public isCategory () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_CATEGORY
  }

  public isStage () {
    return ChannelTypeResolvable[this.type] === ChannelTypeResolvable.GUILD_STAGE_VOICE
  }

  public async setParent (category: CategoryChannel | Snowflake, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    const parentId = typeof category === 'string'
      ? category
      : category.id
    // await request.patch({ parent_id: parentId }, option)

    this.parentId = parentId
    this.parent = this.guild?.channels.cache.get(parentId)
  }

  public async setName (value: string, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    // await request.patch({ name: value }, option)
    this.name = value
  }

  public async setPosition (position: number) {
    const request = new Request(`/channels/${this.id}`)
    // await request.patch({ position })
    this.position = position
  }

  public async delete (option?: RequestOptions) {
    if (this.id === this.guild?.publicUpdateChannelId || this.id === this.guild?.ruleChannelId) {
      return
    }

    const request = new Request(`/channels/${this.id}`)
    // await request.delete(option)
  }
}