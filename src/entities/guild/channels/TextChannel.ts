import { Snowflake } from '../../../types'
import Guild from '../Guild'
import TextChannelResolvable from './TextChannelResolvable'
import { DateTime } from 'luxon'
import CategoryChannel from './CategoryChannel'
import Message from '../../message'
import MessageManager from '../../message/MessageManager'

export default class TextChannel extends TextChannelResolvable {
  constructor (
    id: Snowflake,
    name: string,
    description: string | undefined,
    guildId: Snowflake,
    guild: Guild,
    lastMessageId: Snowflake,
    lastMessage: Message | undefined,
    parentId: Snowflake,
    permissionOverwrites: { [K: string]: string }[],
    position: number,
    cooldown: DateTime,
    topic: string,
    messages: MessageManager,
    isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, 'GUILD_TEXT', name, description, guildId, guild, lastMessageId, lastMessage, parentId, permissionOverwrites, position, cooldown, topic, messages, isNsfw, parent)
    this.messages = new MessageManager(this)
  }
}