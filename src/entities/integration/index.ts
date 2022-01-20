import { BehaviorsExpiration, Snowflake } from '../../types'
import User from '../user'
import { DateTime } from 'luxon'
import IntegrationAccount from './IntegrationAccount'
import IntegrationApplication from './IntegrationApplication'

export default class Integration {
  constructor (
    protected id: Snowflake,
    protected name: string,
    protected type: 'twitch' | 'youtube' | 'discord',
    protected enabled: boolean,
    protected syncing: boolean,
    protected roleId: Snowflake,
    protected enableEmoticons: boolean,
    protected expireBehavior: BehaviorsExpiration,
    protected expireGracePeriod: number,
    protected user: User,
    protected account: IntegrationAccount,
    protected syncedAt: DateTime,
    protected subscriberCount: number,
    protected revoked: boolean,
    protected application: IntegrationApplication,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getName (): string {
    return this.name
  }

  public getType (): 'twitch' | 'youtube' | 'discord' {
    return this.type
  }

  public isEnabled (): boolean {
    return this.enabled
  }

  public isSyncing (): boolean {
    return this.syncing
  }

  public getRoleId (): Snowflake {
    return this.roleId
  }

  public isEnableEmoticons (): boolean {
    return this.enableEmoticons
  }

  public getExpireBehavior (): BehaviorsExpiration {
    return this.expireBehavior
  }

  public getExpireGracePeriod (): number {
    return this.expireGracePeriod
  }

  public getUser (): User {
    return this.user
  }

  public getAccount (): IntegrationAccount {
    return this.account
  }

  public getSyncedDate (): DateTime {
    return this.syncedAt
  }

  public getSubscriberCount (): number {
    return this.subscriberCount
  }

  public isRevoked (): boolean {
    return this.revoked
  }

  public getApplication (): IntegrationApplication {
    return this.application
  }
}