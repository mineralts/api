import { Snowflake } from '../../types'
import GuildMember from '../guild/GuildMember'
import VoiceChannel from '../guild/channels/VoiceChannel'
import Guild from '../guild/Guild'

export default class VoiceState {
  constructor (
    public member: GuildMember,
    public sessionId: string,
    public suppress: boolean,
    public hasVideo: boolean,
    public isMute: boolean,
    public isDeaf: boolean,
    public channelId: Snowflake,
    public channel: VoiceChannel | undefined,
    public guild: Guild,
  ) {
  }

  public async setMute(value: boolean) {
    const request = new Request(`/guilds/${this.guild.id}/members/${this.member.id}`)
    // await request.patch({ mute: value })
    //
    // this.isMute = value
  }

  public async setDeaf(value: boolean) {
    const request = new Request(`/guilds/${this.guild.id}/members/${this.member.id}`)
    // await request.patch({ deaf: value })
    //
    // this.isDeaf = value
  }

  public async move(channel: VoiceChannel | Snowflake) {
    const request = new Request(`/guilds/${this.guild.id}/members/${this.member.id}`)

    // await request.patch({
    //   channel_id: typeof channel === 'string'
    //     ? channel
    //     : channel.id
    // })
    //
    // this.channel = typeof channel === 'string' ?
    //   this.guild.channels.cache.get(channel)
    //   : channel
  }
}