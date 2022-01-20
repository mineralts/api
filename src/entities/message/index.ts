import { MessageOption, Snowflake } from '../../types'
import { DateTime } from 'luxon'
import GuildMember from '../guild/GuildMember'
import Guild from '../guild/Guild'
import TextChannel from '../channels/TextChannel'
import Emoji from '../emoji'
import MessageAttachment from './MessageAttachment'
import ReactionManager from '../reaction/ReactionManager'
import MessageEmbed from '../embed/MessageEmbed'
import Application from '@mineralts/application'
import { parseEmoji } from '../../utils'
import MentionResolvable from '../mention/MentionResolvable'

export default class Message {
  private reactions: ReactionManager = new ReactionManager(this)

  constructor (
    private id: Snowflake,
    private type: number,
    private flags: string[],
    private tts: boolean,
    private createdAt: DateTime | null,
    private updatedAt: DateTime | null,
    private referencedMessage: Message | null,
    private pinned: boolean,
    private mentions: MentionResolvable,
    private author: GuildMember | undefined,
    private guild: Guild | undefined,
    private channel: TextChannel,
    private content: string,
    private attachment: MessageAttachment,
    private components: any[],
    private embeds: MessageEmbed[],
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getType (): number {
    return this.type
  }

  public getFlags (): string[] {
    return this.flags
  }

  public isTTS (): boolean {
    return this.tts
  }

  public getCreatedAt (): DateTime | null {
    return this.createdAt
  }

  public getUpdatedAt (): DateTime | null {
    return this.updatedAt
  }

  public getReferencedMessage (): Message | null {
    return this.referencedMessage
  }

  public isPinned (): boolean {
    return this.pinned
  }

  public getMentions (): MentionResolvable {
    return this.mentions
  }

  public getAuthor (): GuildMember | undefined {
    return this.author
  }

  public getGuild (): Guild | undefined {
    return this.guild
  }

  public getContent (): string {
    return this.content
  }

  public getAttachment (): MessageAttachment {
    return this.attachment
  }

  public getComponents (): any[] {
    return this.components
  }

  public getEmbeds (): MessageEmbed[] {
    return this.embeds
  }

  public getReactions (): ReactionManager {
    return this.reactions
  }

  public async crossPost () {
    if (this.channel.getType() === 'GUILD_NEWS') {
      // const request = Application.createRequest()
      // const request = new Request(`/channels/${this.channel?.id}/messages/${this.id}/crosspost`)
      // console.log(await request.post(null, option))
    }
  }

  public async pin () {
    if (!this.isPinned) {
      const request = Application.createRequest()
      await request.patch(`/channels/${this.channel?.getId()}/pins/${this.id}`, {})
    }
  }

  public async unPin () {
    if (!this.isPinned) {
      const request = Application.createRequest()
      await request.delete(`/channels/${this.channel?.getId()}/pins/${this.id}`)
    }
  }

  public async delete () {
    const request = Application.createRequest()
    await request.delete(`/channels/${this.channel?.getId()}/messages/${this.id}`)
  }

  public async edit (message: MessageOption) {
    const request = Application.createRequest()
    await request.patch(`/channels/${this.channel?.getId()}/messages/${this.id}`, {
      content: message.content,
      embeds: message.embeds,
      attachment: message.attachment,
      components: message.components,
    })
  }

  public async reload () {
    await this.edit({
      content: this.content,
      embeds: this.embeds,
      attachment: this.attachment,
      components: this.components,
      tts: this.tts,
      private: false,
    })
  }

  public async react (emoji: string | Emoji, ) {
    const encodedEmoji = emoji instanceof Emoji
      ? encodeURI(`${emoji.getLabel()}:${emoji.getId()}`)
      : encodeURI(emoji)

    const request = Application.createRequest()
    await request.patch(`/channels/${this.channel?.getId()}/messages/${this.id}/reactions/${encodedEmoji}/@me`, null)
    const client = Application.getClient()

    let a: Emoji = emoji as Emoji
    if (typeof emoji === 'string') {
      const parsedEmoji = parseEmoji(emoji)
      a = new Emoji(parsedEmoji!.id!, parsedEmoji!.name, false, true, false, [])
    }

    this.reactions.addReaction(a, client)
  }
}