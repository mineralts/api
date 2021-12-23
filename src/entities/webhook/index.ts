import { Snowflake } from '../../types'
import User from '../user'
import Guild from '../guild/Guild'
import Channel from '../guild/channels/Channel'

export default class VoiceState {
  constructor (
    public id: Snowflake,
    public type: number,
    public guildId: Snowflake | undefined,
    public channelId: Snowflake | undefined,
    public user: User,
    public name: string | undefined,
    public avatar: string | undefined,
    public token: string,
    public applicationId: Snowflake | undefined,
    public sourceGuild: Guild,
    public sourceChannel: Channel,
    public url: string,
  ) {
  }
}