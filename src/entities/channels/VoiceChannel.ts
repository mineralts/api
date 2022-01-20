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
    private maxUser: number,
    private region: keyof typeof RTC_Region,
    private rateLimitPerUser: number,
    position: number,
    private permission: any[],
    parentId: Snowflake,
    private bitrate: number,
    private videoQuality: keyof typeof VideoQuality,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_VOICE', name, guildId, guild, parentId, position, parent)
  }

  public getBitrate (): number {
    return this.bitrate
  }

  public async setBitrate (value: number) {
    const request = Application.createRequest()
    if (value >= 8000 && value <= 96000) {
      await request.patch(`/channels/${this.getId()}`, { bitrate: value })
      this.bitrate = value
    } else {
      const logger = Application.getLogger()
      logger.error('Please define your bitrate between 8000 and 96000')
    }
  }

  public getRtcRegion (): keyof typeof RTC_Region {
    return this.region
  }

  public async setRtcRegion (region: keyof typeof RTC_Region) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, {
      rtc_region: region !== 'AUTO'
        ? RTC_Region[region]
        : null
    })

    this.region = region
  }

  public getMaxMember (): number {
    return this.rateLimitPerUser
  }

  public async setMaxMember (value: number | 'UNLIMITED') {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, {
      user_limit: value === 'UNLIMITED' ? 0 : value
    })

    this.maxUser = value === 'UNLIMITED' ? 0 : value
  }

  public getVideoQuality (): keyof typeof VideoQuality {
    return this.videoQuality
  }

  public async setVideoQuality (quality: keyof typeof VideoQuality) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, {
      video_quality_mode: VideoQuality[quality]
    })

    this.videoQuality = quality
  }
}