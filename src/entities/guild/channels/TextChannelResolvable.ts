import {
  ChannelTypeResolvable,
  MessageComponentResolvable, MessageOption,
  Milliseconds,
  RequestOptions,
  Snowflake
} from '../../../types'
import Guild from '../Guild'
import Channel from './Channel'
import { DateTime } from 'luxon'
import CategoryChannel from './CategoryChannel'
import Message from '../../message'
import MessageManager from '../../message/MessageManager'
import EmbedRow from '../../embed/EmbedRow'

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
    topic: string,
    public messages: MessageManager,
    public isNsfw: boolean,
    parent?: CategoryChannel,
  ) {
    super(id, type, name, guildId, guild, parentId, position, parent)
  }

  public async setCooldown (value: Milliseconds, option?: RequestOptions) {
    if (value < 0 || value > 21600) {
      // Logger.send('error', `${value} cannot be value < 0 or value > 21600`)
    }

    const request = new Request(`/channels/${this.id}`)
    // await request.patch({ rate_limit_per_user: value }, option)
    this.cooldown = DateTime.fromMillis(value)
  }

  public async setDescription (value: string, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}`)
    // await request.patch({ topic: value }, option)
    this.description = value
  }

  public async setNSFW(bool: boolean) {
    const request = new Request(`/channels/${this.id}`)
    // await request.patch({ nsfw: bool })
    this.isNsfw = bool
  }

  public async send (messageOption: MessageOption, option?: RequestOptions) {
    const request = new Request(`/channels/${this.id}/messages`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson() as unknown as MessageComponentResolvable
      })
      return row
    })

    if (!messageOption.content?.length && !messageOption.embeds?.length) {
      // new InvalidBody()
    }

    // const payload = await request.post({
    //   ...messageOption,
    //   components
    // }, option)
    //
    // return createMessageFromPayload({
    //   ...payload,
    //   guild_id: this.guild!.id,
    // })
  }
}