import Collection from '../../utils/Collection'
import { ChannelOptionResolvable, ChannelResolvable, ChannelTypeResolvable, Snowflake } from '../../types'
import Guild from './Guild'
import Application from '@mineralts/application'

export default class GuildChannelManager {
  private cache: Collection<Snowflake, ChannelResolvable> = new Collection()

  constructor (private guild?: Guild) {
  }

  public getCache (): Collection<Snowflake, ChannelResolvable>  {
    return this.cache
  }

  public register (channels: Collection<Snowflake, ChannelResolvable>) {
    this.cache = channels
    return this
  }

  public async create (channel: ChannelOptionResolvable) {
    let payload: any
    const request = Application.createRequest()
    const baseChannel = {
      name: channel.name,
      type: ChannelTypeResolvable[channel.type],
      permission_overwrites: channel.permissionOverwrites || [],
      parent_id: channel.options?.parent?.getId() || channel.options?.parentId
    }

    if (channel.type === 'GUILD_TEXT') {
      payload = await request.post(`/guilds/${this.guild?.getId()}/channels`, {
        ...baseChannel,
        nsfw: channel.options?.nsfw || false,
        rate_limit_per_user: channel.options?.cooldown || 0,
        topic: channel.options?.topic || ''
      })
    }

    if (channel.type === 'GUILD_VOICE') {
      payload = await request.post(`/guilds/${this.guild?.getId()}/channels`, {
        ...baseChannel,
        user_limit: channel.options?.userLimit || 0,
        bitrate: channel.options?.bitrate || 64000
      })
    }

    if (channel.type === 'GUILD_CATEGORY') {
      payload = await request.post(`/guilds/${this.guild?.getId()}/channels`, {
        ...baseChannel
      })
    }

    if (channel.type === 'GUILD_STAGE_VOICE') {
      payload = await request.post(`/guilds/${this.guild?.getId()}/channels`, {
        ...baseChannel,
        user_limit: channel.options?.userLimit || 0,
        bitrate: channel.options?.bitrate || 64000
      })
    }

    return this.cache.get(payload.id)
  }

}