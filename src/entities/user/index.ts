import Application from '@mineralts/application'
import { DateTime } from 'luxon'
import { Snowflake } from '../../types'
import Presence from '../presence'

export default class User {
  constructor (
    private id: Snowflake,
    private username: string,
    private discriminator: string,
    private tag: string,
    private bot: boolean,
    private premiumSince: DateTime | undefined,
    private verified: boolean,
    private mfaEnabled: boolean,
    private flags: number,
    private email: string | null,
    private avatar: string | null,
    private banner: string | null,
    private presence: Presence | undefined,
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getUsername (): string {
    return this.username
  }

  public getDiscriminator (): string {
    return this.discriminator
  }

  public getTag (): string {
    return this.tag
  }

  public isBot (): boolean {
    return this.bot
  }

  public getPremiumSince (): DateTime | undefined {
    return this.premiumSince
  }

  public isVerified (): boolean {
    return this.verified
  }

  public hasMfaEnabled (): boolean {
    return this.mfaEnabled
  }

  public getFlags (): number {
    return this.flags
  }

  public getEmail (): string | null {
    return this.email
  }

  public getAvatar (): string | null {
    return this.avatar
  }

  public getAvatarUrl (format = 'webp', size?, dynamic = false): string | null {
    format = dynamic && this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${Application.cdn}/avatars/${this.id}/${this.avatar}`, { format, size })
      : null
  }

  public getDefaultAvatarUrl (): string {
    return `${Application.cdn}/embed/avatars/${this.discriminator}.png`
  }

  public getBanner (): string | null {
    return this.banner
  }

  public async getBannerUrl (format = 'webp', size?, dynamic = false): Promise<string | null> {
    if (dynamic) format = this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${Application.cdn}/banners/${this.id}/${this.banner}`, { format, size })
      : null
  }

  public getPresence (): Presence | undefined {
    return this.presence
  }

  protected makeImageUrl (root, { format = 'webp', size = 256 }: { format?: any; size?: any } = {}) {
    return `${root}.${format}${size ? `?size=${size}` : ''}`
  }
}