import { Snowflake } from '../../types'
import Guild from '../guild/Guild'
import Application from '@mineralts/application'
import StageChannel from '../channels/StageChannel'

export default class StageInstance {
  constructor (
    private id: Snowflake,
    private guildId: Snowflake,
    private channelId: Snowflake,
    private topic: string,
    private privacyLevel: number,
    private discoverableDisabled: boolean,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getGuild (): Guild {
    const client = Application.getClient()
    return client.guilds.getCache().get(this.guildId)!
  }

  public getChannel (): StageChannel {
    const guild = this.getGuild()
    return guild.getChannels().getCache().get(this.guildId)!
  }

  public getTopic (): string {
    return this.topic
  }

  public getPrivacyLevel (): number {
    return this.privacyLevel
  }

  public isDiscoverableDisabled (): boolean {
    return this.discoverableDisabled
  }
}