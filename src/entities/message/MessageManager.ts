import Collection from '../../utils/Collection'
import { Snowflake } from '../../types'
import Message from './index'
import TextChannel from '../channels/TextChannel'
import Application from '@mineralts/application'
import { MessageBuilder } from '@mineralts/core'

export default class MessageManager {
  private cache: Collection<Snowflake, Message> = new Collection()

  constructor (private channel?: TextChannel) {
  }

  public getCache () {
    return this.cache
  }

  public async fetch (id: Snowflake): Promise<Message>
  public async fetch (options?: { before?: Snowflake, after?: Snowflake, around?: Snowflake, limit?: number }): Promise<void>
  public async fetch (value?: { before?: Snowflake, after?: Snowflake, around?: Snowflake, limit?: number } | Snowflake): Promise<Message | void>{
    const request = Application.createRequest()

    if (typeof value === 'string') {
      const payload = await request.get(`/channels/${this.channel?.getId()}/messages/${value}`)
      return this.instantiate(payload)
    }

    let query = ''

    if (value) {
      if (Object.entries(value).length > 1) {
        const logger = Application.getLogger()
        logger.error('The before, after, and around keys are mutually exclusive, only one may be passed at a time.')
        process.exit(1)
      }

      Object.entries(value).forEach(([key, value]: [string, string | number]) => {
        query += `${key}=${value}`
      })
    }

    const payload = await request.get(`/channels/${this.channel?.getId()}/messages?${query}`)
    payload.forEach((item) => this.instantiate(item))
  }

  private instantiate (payload): Message {
    const messageBuilder = new MessageBuilder(Application.getClient())
    const message = messageBuilder.build({
      ...payload,
      guild_id: this.channel!.getGuild()!.getId()
    })

    this.cache.set(message.getId(), message)
    return message
  }
}