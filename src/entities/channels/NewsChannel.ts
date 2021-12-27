import { Snowflake } from '../../types'
import Guild from '../guild/Guild'
import TextChannelResolvable from './TextChannelResolvable'
import CategoryChannel from './CategoryChannel'
import Message from '../message'
import MessageManager from '../message/MessageManager'
import { DateTime } from 'luxon'

export default class NewsChannel extends TextChannelResolvable {
  constructor (
    id: Snowflake,
    name: string,
    description: string,
    guildId: Snowflake,
    guild: Guild,
    lastMessageId: Snowflake,
    lastMessage: Message | undefined,
    parentId: Snowflake,
    permissionOverwrites: { [K: string]: string }[],
    position: number,
    rateLimitePerUser: DateTime,
    topic: string,
    messages: MessageManager,
    parent?: CategoryChannel
  ) {
    super(id, 'GUILD_NEWS', name, description, guildId, guild, lastMessageId, lastMessage, parentId, permissionOverwrites, position, rateLimitePerUser, messages, false, parent)
  }
}