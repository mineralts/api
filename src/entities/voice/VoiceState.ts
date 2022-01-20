import { Snowflake } from '../../types'
import GuildMember from '../guild/GuildMember'
import VoiceChannel from '../channels/VoiceChannel'
import Guild from '../guild/Guild'
import Application from '@mineralts/application'

export default class VoiceState {
  constructor (
    private member: GuildMember,
    private sessionId: string,
    private suppress: boolean,
    private video: boolean,
    private mute: boolean,
    private deaf: boolean,
    private channelId: Snowflake,
    private channel: VoiceChannel | undefined,
    private guild: Guild,
  ) {
  }

  public getMember (): GuildMember {
    return this.member
  }

  public getSessionId (): string {
    return this.sessionId
  }

  public isSuppress (): boolean {
    return this.suppress
  }

  public hasVideo (): boolean {
    return this.video
  }

  public isMute (): boolean {
    return this.mute
  }

  public isDeaf (): boolean {
    return this.deaf
  }

  public getChannel (): VoiceChannel | undefined {
    return this.channel
  }

  public getGuild (): Guild {
    return this.guild
  }

  public async setMute(value: boolean) {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.guild.getId()}/members/${this.member.getId()}`, {
      mute: value
    })

    this.mute = value
  }

  public async setDeaf(value: boolean) {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.guild.getId()}/members/${this.member.getId()}`, {
      deaf: value
    })

    this.deaf = value
  }

  public async move(channel: VoiceChannel | Snowflake) {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.guild.getId()}/members/${this.member.getId()}`, {
      channel_id: typeof channel === 'string'
        ? channel
        : channel.getId()
    })

    this.channel = typeof channel === 'string' ?
      this.guild.getChannels().getCache().get(channel)
      : channel
  }
}