import Emoji from '../emoji'
import GuildMember from '../guild/GuildMember'
import Client from '../client'

export default class Reaction {
  constructor (
    private emoji: Emoji,
    private member: GuildMember | Client
  ) {
  }

  public getEmoji (): Emoji {
    return this.emoji
  }

  public getMember (): GuildMember | Client {
    return this.member
  }
}