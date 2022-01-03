import { Snowflake } from '../../types'
import User from '../user'
import { DateTime } from 'luxon'
import Guild from './Guild'
import GuildMemberRoleManager from './GuildMemberRoleManager'
import Role from '../roles'
import VoiceState from '../voice/VoiceState'
import Application from '@mineralts/application'

export default class GuildMember {
  constructor (
    public id: Snowflake,
    public username: string,
    public user: User,
    public guild: Guild,
    public roles: GuildMemberRoleManager,
    public highestRole: Role | null,
    public isPending: boolean,
    public voice: VoiceState,
    public joinedAt: DateTime,
  ) {
  }

  public async setUsername (value: string) {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.guild.id}/members/${this.id}`, { nick: value })

    this.username = value
  }
}