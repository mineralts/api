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
    public communicationTimeout: DateTime | null,
    public joinedAt: DateTime,
  ) {
  }

  public async setUsername (value: string) {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.guild.id}/members/${this.id}`, {
      nick: value
    })
  }

  public async setMute (date: DateTime, reason?: string) {
    const request = Application.createRequest()

    if (reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': reason
      })
    }

    await request.patch(`/guilds/${this.guild.id}/members/${this.id}`, {
      communication_disabled_until: date
    })

    request.resetHeaders('X-Audit-Log-Reason')
  }
}