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
    private id: Snowflake,
    private username: string,
    private user: User,
    private guild: Guild,
    private roles: GuildMemberRoleManager,
    private highestRole: Role | null,
    private pending: boolean,
    private voice: VoiceState,
    private communicationTimeout: DateTime | null,
    private joinedAt: DateTime,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getUsername (): string {
    return this.username
  }

  public getUser (): User {
    return this.user
  }

  public getGuild (): Guild {
    return this.guild
  }

  public getRoles (): GuildMemberRoleManager {
    return this.roles
  }

  public getHighestRole (): Role | null {
    return this.highestRole
  }

  public isPending (): boolean {
    return this.pending
  }

  public getVoice (): VoiceState {
    return this.voice
  }

  public getCommunicationTimeout (): DateTime | null {
    return this.communicationTimeout
  }

  public getJoinedAt (): DateTime {
    return this.joinedAt
  }

  public async setUsername (value: string) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    await request.patch(`/guilds/${guildId}/members/${this.id}`, {
      nick: value
    })
  }

  public async exclude (date: DateTime, reason?: string) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    if (reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': reason
      })
    }

    await request.patch(`/guilds/${guildId}/members/${this.id}`, {
      communication_disabled_until: date
    })

    request.resetHeaders('X-Audit-Log-Reason')
  }

  public async sorry (reason?: string) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    if (reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': reason
      })
    }

    await request.patch(`/guilds/${guildId}/members/${this.id}`, {
      communication_disabled_until: null
    })

    request.resetHeaders('X-Audit-Log-Reason')
  }
  
  public async ban (options: { messageCount?: number, reason?: string }) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    if (options.messageCount && (options.messageCount < 0 || options.messageCount > 50)) {
      const logger = Application.getLogger()
      logger.error(`You can delete between 0 and 7 days only (${options.messageCount} set).`)
      return
    }

    if (options.reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': options.reason
      })
    }

    await request.patch(`/guilds/${guildId}/bans/${this.id}`, {
      delete_message_days: options.messageCount,
      reason: options.reason
    })

    request.resetHeaders('X-Audit-Log-Reason')
  }

  public async unban (reason?: string) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    if (reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': reason
      })
    }

    await request.delete(`/guilds/${guildId}/bans/${this.id}`)
    request.resetHeaders('X-Audit-Log-Reason')
  }

  public async kick (reason?: string) {
    const request = Application.createRequest()
    const guildId = this.getGuild().getId()

    if (reason) {
      request.defineHeaders({
        'X-Audit-Log-Reason': reason
      })
    }

    await request.delete(`/guilds/${guildId}/members/${this.id}`)
    request.resetHeaders('X-Audit-Log-Reason')
  }
}