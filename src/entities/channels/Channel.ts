import { ChannelTypeResolvable, Snowflake } from '../../types'
import Guild from '../guild/Guild'
import CategoryChannel from './CategoryChannel'
import Application from '@mineralts/application'

export default class Channel {
  constructor (
    private id: Snowflake,
    private type: keyof typeof ChannelTypeResolvable,
    private name: string,
    private guildId: Snowflake,
    private guild: Guild | undefined,
    private parentId: Snowflake | undefined,
    private position: number,
    private parent?: CategoryChannel,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getType (): keyof typeof ChannelTypeResolvable {
    return this.type
  }

  public getGuild (): Guild | undefined {
    return this.guild
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

  public getParent (): CategoryChannel | undefined {
    return this.parent
  }

  public async setParent (category: CategoryChannel | Snowflake) {
    const request = Application.createRequest()
    const parentId = typeof category === 'string'
      ? category
      : category.id

    await request.patch(`/channels/${this.id}`,{
      parent_id: parentId
    })

    this.parentId = parentId
    this.parent = this.guild?.channels.cache.get(parentId)
  }

  public getName (): string {
    return this.name
  }

  public async setName (value: string) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.id}`, {
      name: value
    })

    this.name = value
  }

  public getPosition (): number {
    return this.position
  }

  public async setPosition (position: number) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.id}`, { position })

    this.position = position
  }

  public async delete () {
    if (this.id === this.guild?.publicUpdateChannelId || this.id === this.guild?.ruleChannelId) {
      return
    }

    const request = Application.createRequest()
    await request.delete(`/channels/${this.id}`)
  }
}