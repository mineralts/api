import { DateTime } from 'luxon'
import { ActivityAssets, ActivityTimestamps, ActivityType, Snowflake } from '../../types'
import Emoji from '../emoji'

export default class Activity {
  constructor (
    private id: string,
    private type: keyof ActivityType,
    private description: string,
    private name: string,
    private emoji: Emoji | undefined,
    private timestamps: ActivityTimestamps,
    private state: string | undefined,
    private detail: string | undefined,
    private assets: ActivityAssets,
    private buttons: string[],
    private syncId: string | undefined,
    private sessionId: string | undefined,
    private createdAt: DateTime,
    private applicationId: Snowflake | undefined
  ) {
  }

  public getId (): string {
    return this.id
  }

  private getType (): keyof ActivityType {
    return this.type
  }

  private getDescription (): string {
    return this.description
  }

  private getName (): string {
    return this.name
  }

  private getEmoji (): Emoji | undefined {
    return this.emoji
  }

  private getTimestamps (): ActivityTimestamps {
    return this.timestamps
  }

  private getState (): string | undefined {
    return this.state
  }

  private getDetail (): string | undefined {
    return this.detail
  }

  private getAssets (): ActivityAssets {
    return this.assets
  }

  private getButtons (): string[] {
    return this.buttons
  }

  private getSyncId (): string | undefined {
    return this.syncId
  }

  private getSessionId (): string | undefined {
    return this.sessionId
  }

  private getCreatedAt (): DateTime {
    return this.createdAt
  }

  private getApplicationId (): Snowflake | undefined {
    return this.applicationId
  }
}