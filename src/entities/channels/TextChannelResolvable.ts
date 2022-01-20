import {
  ChannelTypeResolvable,
  MessageComponentResolvable, MessageOption,
  Milliseconds,
  Snowflake
} from '../../types'
import Guild from '../guild/Guild'
import Channel from './Channel'
import { DateTime } from 'luxon'
import CategoryChannel from './CategoryChannel'
import Message from '../message'
import MessageManager from '../message/MessageManager'
import EmbedRow from '../embed/EmbedRow'
import Application from '@mineralts/application'
import { MessageBuilder } from '@mineralts/core'

export default class TextChannelResolvable extends Channel {
  constructor (
    id: Snowflake,
    type: keyof typeof ChannelTypeResolvable,
    name: string,
    public description: string | undefined,
    guildId: Snowflake,
    guild: Guild,
    public lastMessageId: Snowflake,
    public lastMessage: Message | undefined,
    parentId: Snowflake,
    public permissionOverwrites: { [K: string]: string }[],
    position: number,
    public cooldown: DateTime,
    public messages: MessageManager,
    public isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, type, name, guildId, guild, parentId, position, parent)
  }

  public getCooldown (): DateTime {
    return this.cooldown
  }

  public async setCooldown (value: Milliseconds) {
    if (value < 0 || value > 21600) {
      const logger = Application.getLogger()
      logger.error(`${value} cannot be value < 0 or value > 21600`)
    }

    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, { rate_limit_per_user: value })

    this.cooldown = DateTime.fromMillis(value)
  }

  public getDescription (): string | undefined {
    return this.description
  }

  public async setDescription (value: string | null) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, { topic: value })

    this.description = value || ''
  }

  public isNSFW (): boolean {
    return this.isNsfw
  }

  public async setNSFW(bool: boolean) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.getId()}`, { nsfw: bool })

    this.isNsfw = bool
  }

  public async send (messageOption: MessageOption) {
    const request = Application.createRequest()

    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson() as unknown as MessageComponentResolvable
      })
      return row
    })

    if (!messageOption.content?.length && !messageOption.embeds?.length) {
      const logger = Application.getLogger()
      logger.error('Invalid message body')
      process.exit(1)
    }

    const payload = await request.post(`/channels/${this.getId()}/messages`, {
      ...messageOption,
      components
    })

    const messageBuilder = new MessageBuilder(Application.getClient())
    return messageBuilder.build({
      ...payload,
      guild_id: this.getGuild()!.getId(),
    })
  }
}