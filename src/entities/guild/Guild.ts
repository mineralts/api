import Collection from '../../utils/Collection'
import {
  ExplicitContentLevel, Feature, GuildFeature, LocalPath, Milliseconds,
  NotificationLevel,
  Region,
  Snowflake, SystemChannelFlag,
  VerificationLevel
} from '../../types'
import GuildMember from './GuildMember'
import VoiceChannel from '../channels/VoiceChannel'
import { join } from 'path'
import fs from 'fs'
import TextChannel from '../channels/TextChannel'
import Application from '@mineralts/application'
import Command from '../../command/Command'
import GuildRoleManager from './GuildRoleManager'
import GuildChannelManager from './GuildChannelManager'
import GuildStickerManager from './GuildStickerManager'
import GuildMemberManager from './GuildMemberManager'
import GuildThreadManager from './GuildThreadManager'
import GuildEmojiManager from './GuildEmojiManager'
import InviteManager from '../invitation/InviteManager'
import GuildHashes from './GuildHashes'
import { Assembler, CommandContext } from '@mineralts/assembler'
import { MineralCommand } from '@mineralts/core'
import { keyFromEnum, serializeCommand } from '../../utils'

export default class Guild {
  public commands: Collection<Snowflake, Command> = new Collection()

  constructor (
    private id: Snowflake,
    private _name: string,
    private icon: string | null,
    private banner: string | null,
    private splash: string | null,
    private discoverySplash: string | null,
    private description: string | undefined,
    private premiumTier: number,
    private premiumSubscriptionCount: number,
    private systemChannelFlags: number,
    private explicitContentFilter: number,
    private region: keyof typeof Region,
    private isLazy: boolean,
    private applicationId: string | null,
    private nsfw: boolean,
    private memberCount: number,
    private roles: GuildRoleManager,
    private stageInstances: [],
    private guildHashes: GuildHashes,
    private afkChannelId: Snowflake,
    private publicUpdateChannelId: Snowflake,
    private channels: GuildChannelManager,
    private verificationLevel: number,
    private hasPremiumProgressBarEnabled: boolean,
    private features: GuildFeature[],
    private stickers: GuildStickerManager,
    private members: GuildMemberManager,
    private bots: GuildMemberManager,
    private ruleChannelId: Snowflake,
    private guildScheduledEvents: any[],
    private defaultMessageNotifications: keyof typeof NotificationLevel,
    private MFALevel: number,
    private threads: GuildThreadManager,
    private maxMemberSize: number,
    private emojis: GuildEmojiManager,
    private defaultLang: string,
    private ownerId: Snowflake,
    private owner: GuildMember | undefined,
    private maxVideoChannelUsers: number,
    private registeredCommandCount: number,
    private applicationCommandCount: number,
    private afkTimeout: number,
    private systemChannelId: Snowflake,
    private vanityUrlCode: string | null,
    private embeddedActivities: any[],
    private invites: InviteManager,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public get name (): string {
    return this._name
  }

  public async setName (value: string): Promise<void> {
    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, { name: value })

    if (result) {
      this._name = value
    }
  }


  public getPreferredLocale (): keyof typeof Region {
    return this.region
  }

  public async setPreferredLocale (region: keyof typeof Region): Promise<void> {
    const request = Application.createRequest()
    await request.patch(`/guilds/${this.id}`, {
      preferred_locale: region
    })

    this.region = region
  }

  public async leave (): Promise<void> {
    const client = Application.getClient()
    if (this.ownerId === client.getUser().getId()) {
      throw new Error('GUILD_OWNER')
    }

    const request = Application.createRequest()
    const result = await request.delete(`/guilds/${this.id}`)
    if (result) {
      client.guilds.getCache().delete(this.id)
    }
  }

  public isNsfw (): boolean {
    return this.nsfw
  }

  public getRoles (): GuildRoleManager {
    return this.roles
  }

  public setRoles (roleManager: GuildRoleManager) {
    this.roles = roleManager
  }

  public getChannels (): GuildChannelManager {
    return this.channels
  }

  public getAfkChannel (): VoiceChannel | undefined {
    return this.channels.getCache().get<VoiceChannel>(this.afkChannelId)
  }

  public async setAfkChannel (voiceChannel: VoiceChannel | Snowflake): Promise<void> {
    const value = voiceChannel instanceof VoiceChannel ? voiceChannel.getId() : voiceChannel

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      afk_channel_id: value
    })

    if (result) {
      this.afkChannelId = value
    }
  }

  public getVerificationLevel (): keyof typeof VerificationLevel {
    return keyFromEnum(VerificationLevel, this.verificationLevel)
  }

  public async setVerificationLevel (level: keyof typeof VerificationLevel): Promise<void> {
    const value = VerificationLevel[level]

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      verification_level: value
    })

    if (result) {
      this.verificationLevel = value
    }
  }

  public getNotificationLevel (): keyof typeof NotificationLevel {
    return this.defaultMessageNotifications
  }

  public async setNotificationLevel (level: keyof typeof NotificationLevel): Promise<void> {
    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      default_message_notifications: NotificationLevel[level]
    })

    if (result) {
      this.defaultMessageNotifications = level
    }
  }

  public getExplicitContentLevel (): keyof typeof ExplicitContentLevel {
    return keyFromEnum(ExplicitContentLevel, this.explicitContentFilter)
  }

  public async setExplicitContentFilter (level: keyof typeof ExplicitContentLevel): Promise<void> {
    const explicitContentFilter = ExplicitContentLevel[level]

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      explicit_content_filter: explicitContentFilter
    })

    if (result) {
      this.explicitContentFilter = explicitContentFilter
    }
  }

  public getAfkTimeout (): Milliseconds {
    return this.afkTimeout
  }

  public async setAfkTimeout (value: Milliseconds): Promise<void> {
    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      afk_timeout: value
    })

    if (result) {
      this.afkTimeout = value
    }
  }

  public hasFeature(feature: keyof typeof Feature): boolean {
    return this.features.includes(feature)
  }

  public getIcon (): string | null {
    const environment = Application.getEnvironment()

    if (environment.get('DEBUG') && !this.hasFeature('ANIMATED_ICON')) {
      const logger = Application.getLogger()
      logger.error('You do not have permission to upload a invitation banner')
    }

    return this.icon
  }

  public async setIcon (path: LocalPath): Promise<void> {
    if (!this.hasFeature('ANIMATED_ICON') && path.split('.')[1] === 'gif') {
      const logger = Application.getLogger()
      logger.error('You do not have permission to upload a invitation banner')
    }

    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const request = Application.createRequest()
    const data = await request.patch(`/guilds/${this.id}`, {
      icon: `data:image/png;base64,${file}`
    })

    if (data) {
      this.icon = data.icon
    }
  }

  public async removeIcon (): Promise<void> {
    const request = Application.createRequest()
    const data =  await request.patch(`/guilds/${this.id}`, {
      icon: null
    })

    if (data) {
      this.icon = data.icon
    }
  }

  public getOwner (): GuildMember {
    return this.owner!
  }

  public async setOwner (member: GuildMember | Snowflake): Promise<void> {
    const client = Application.getClient()
    const value = member instanceof GuildMember ? member.getId() :member

    if (this.ownerId === client.getUser().getId()) {
      throw new Error('OWNER_IS_ALREADY_MEMBER')
    }

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      owner_id: value
    })

    if (result) {
      this.ownerId = value
      this.owner = this.members.getCache().get(value)!
    }
  }

  public getSplash (): string | null {
    const environment = Application.getEnvironment()

    if (environment.get('DEBUG') && !this.features.includes('INVITE_SPLASH')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a invitation banner')
    }

    return this.splash
  }

  public async setSplash (path: string): Promise<void> {
    if (!this.features.includes('INVITE_SPLASH')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a invitation banner')
    }

    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      splash: `data:image/png;base64,${file}`
    })

    if (result) {
      this.splash = result.splash
    }
  }

  public getDiscoverySplash (): string | null {
    const environment = Application.getEnvironment()

    if (environment.get('DEBUG') && !this.features.includes('DISCOVERABLE')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a discovery banner')
    }

    return this.discoverySplash
  }

  public async setDiscoverySplash (path: string): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a discovery banner')
    }

    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      discovery_splash: `data:image/png;base64,${file}`
    })

    if (result) {
      this.discoverySplash = result.splash
    }
  }

  public getBanner (): string | null {
    const environment = Application.getEnvironment()

    if (environment.get('DEBUG') && !this.features.includes('DISCOVERABLE')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a banner')
    }

    return this.banner
  }

  public async setBanner (path: string): Promise<void> {
    if (!this.features.includes('DISCOVERABLE')) {
      const logger = Application.getLogger()
      logger.warn('You do not have permission to upload a banner')
    }

    const filePath = join(process.cwd(), path)
    const file = await fs.promises.readFile(filePath, 'base64')

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      banner: `data:image/png;base64,${file}`
    })

    if (result) {
      this.banner = result
    }
  }

  public getSystemChannel (): TextChannel | undefined {
    return this.channels.getCache().get(this.systemChannelId)
  }

  public async setSystemChannel (channel: TextChannel | Snowflake): Promise<void> {
    const value = channel instanceof TextChannel ? channel.getId() :channel

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      system_channel_id: value
    })

    if (result) {
      this.systemChannelId = result
    }
  }

  public getSystemChannelFlag (): keyof typeof SystemChannelFlag {
    return keyFromEnum(SystemChannelFlag, this.systemChannelFlags)
  }

  public async setSystemChannelFlag (flag: keyof typeof SystemChannelFlag): Promise<void> {
    const value = SystemChannelFlag[flag]

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      system_channel_flags: value
    })

    if (result) {
      this.systemChannelFlags = value
    }
  }

  public getRuleChannel (): TextChannel | undefined {
    return this.channels.getCache().get(this.ruleChannelId)
  }

  public async setRuleChannel (channel: TextChannel | Snowflake): Promise<void> {
    const value = channel instanceof TextChannel ? channel.getId() : channel

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      rules_channel_id: value
    })

    if (result) {
      this.ruleChannelId = value
    }
  }

  public async setPublicUpdateChannel (channel: TextChannel | Snowflake): Promise<void> {
    const value = channel instanceof TextChannel ? channel.getId() : channel

    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      public_updates_channel_id: value
    })

    if (result) {
      this.publicUpdateChannelId = value
    }
  }

  public getDescription (): string | undefined {
    return this.description
  }

  public async setDescription (value: string): Promise<void> {
    const request = Application.createRequest()
    const result = await request.patch(`/guilds/${this.id}`, {
      description: value
    })

    if (result) {
      this.description = value
    }
  }

  public async registerCommands (assembler: Assembler) {
    const container = assembler.application.container
    const request = Application.createRequest()

    const commands = container.commands.filter((command) => (
      command.data.scope === 'GUILD'
    ))

    await Promise.all(
      container.subcommands.map((subcommand) => {
        const parent = assembler.application.container.commands.find((command) => (
          command.data.label === subcommand.data.parent[0]
        ))

        if (!parent) {
          const logger = Application.getLogger()
          logger.fatal(`Subcommand ${subcommand.data.parent[0]}.${subcommand.data.label} is invalid because it is not associated with any parent command.`)
          process.exit(1)
        }

        parent.data.options.push({
          name: subcommand.data.label,
          description: subcommand.data.description,
          options: subcommand.data.options,
          type: 'SUB_COMMAND'
        })
      })
    )

    await Promise.all(
      commands.map(async (command: MineralCommand & { data: CommandContext, id: string, guild: Guild }) => {
        const payload = await request.post(`/applications/${assembler.application.client.getApplication().id}/guilds/${this.id}/commands`, {
          ...serializeCommand(command.data)
        })

        command.id = payload.id
        command.guild = this

        this.commands.set(command.id!, command as unknown as Command)
      })
    )
  }

  public getVanityUrlCode (): string | null {
    return this.vanityUrlCode
  }

  public getActivities (): any[] {
    return this.embeddedActivities
  }

  public getInvites (): InviteManager {
    return this.invites
  }
}