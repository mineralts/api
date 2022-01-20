import Message from '../message'
import { Snowflake } from '../../types'
import GuildMember from '../guild/GuildMember'
import Client from '../client'
import Emoji from '../emoji'
import Reaction from './Reaction'
import Collection from '../../utils/Collection'

export default class ReactionManager {
  private cache: Collection<Snowflake, Reaction[]> = new Collection()

  constructor (private message: Message) {
  }

  public getCache (): Collection<Snowflake, Reaction[]> {
    return this.cache
  }

  public addReaction(emoji: Emoji, member: GuildMember | Client) {
    const userReactions = this.cache.get(member.getUser().getId())
    const reaction = new Reaction(emoji, member)

    if (!userReactions) {
      this.cache.set(member.getUser().getId(), [reaction])
      return
    }
    userReactions.push(reaction)
  }

  public async remove (member: Snowflake | GuildMember | Client) {
    const snowflake = member instanceof GuildMember || member instanceof Client
      ? member.getUser().getId()
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