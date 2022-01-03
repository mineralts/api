import { RTC_Region, Snowflake, VideoQuality } from '../../types'
import Channel from './Channel'
import Guild from '../guild/Guild'
import CategoryChannel from './CategoryChannel'
import Application from '@mineralts/application'

export default class VoiceChannel extends Channel {
  constructor (
    id: Snowflake,
    name: string,
    guildId: Snowflake,
    guild: Guild | undefined,
    public maxUser: number,
    public region: keyof typeof RTC_Region,
    public rateLimitPerUser: number,
    position: number,
    public permission: any[],
    parentId: Snowflake,
    public bitrate: number,
    public videoQuality: keyof typeof VideoQuality,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_VOICE', name, guildId, guild, parentId, position, parent)
  }

  public async setBitrate (value: number) {
    const request = Application.createRequest()
    if (value >= 8000 && value <= 96000) {
      await request.patch(`/channels/${this.id}`, { bitrate: value })
      this.bitrate = value
    } else {
      const logger = Application.getLogger()
      logger.error('Please define your bitrate between 8000 and 96000')
    }
  }

  public async setRtcRegion (region: keyof typeof RTC_Region) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.id}`, {
      rtc_region: region !== 'AUTO'
        ? RTC_Region[region]
        : null
    })

    this.region = region
  }

  public async setMaxUser (value: number | 'UNLIMITED') {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.id}`, {
      user_limit: value === 'UNLIMITED' ? 0 : value
    })

    this.maxUser = value === 'UNLIMITED' ? 0 : value
  }

  public async setVideoQuality (quality: keyof typeof VideoQuality) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.id}`, {
      video_quality_mode: VideoQuality[quality]
    })

    this.videoQuality = quality
  }
}