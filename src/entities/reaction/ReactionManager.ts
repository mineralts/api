import { Collection } from '@mineralts/core'
import Message from '../message'
import { RequestOptions, Snowflake } from '../../types'
import GuildMember from '../guild/GuildMember'
import Client from '../client'
import Emoji from '../emoji'
import Reaction from './Reaction'

export default class ReactionManager {
  public readonly cache: Collection<Snowflake, Reaction[]> = new Collection()

  constructor (private message: Message) {
  }

  public addReaction(emoji: Emoji, member: GuildMember | Client) {
    const userReactions = this.cache.get(member.user.id)
    const reaction = new Reaction(emoji, member)

    if (!userReactions) {
      this.cache.set(member.user.id, [reaction])
      return
    }
    userReactions.push(reaction)
  }

  public async remove (member: Snowflake | GuildMember | Client, option?: RequestOptions) {
    const snowflake = member instanceof GuildMember || member instanceof Client
      ? member.user.id
      : member

    const memberReactions = this.cache.get(snowflake)
    // if (memberReactions?.length) {
    //   await Promise.all(
    //     memberReactions.map(async (reaction: Reaction) => {
    //       const encodedEmoji = encodeURI(reaction.emoji.id ? `${reaction.emoji.label}:${reaction.emoji.id}` : reaction.emoji.label)
    //       const request = new Request(`/channels/${this.message.channel?.id}/messages/${this.message.id}/reactions/${encodedEmoji}/${snowflake}`)
    //       return request.delete(option)
    //     })
    //   )
    // }
  }
}