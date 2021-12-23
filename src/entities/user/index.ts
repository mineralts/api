import Application from '@mineralts/application'
import { DateTime } from 'luxon'
import { Snowflake } from '../../types'

export default class User {
  constructor (
    public readonly id: Snowflake,
    public readonly username: string,
    public readonly discriminator: string,
    public readonly tag: string,
    public readonly isBot: boolean,
    public readonly premiumSince: DateTime | undefined,
    public readonly isVerified: boolean,
    public readonly hasMfaEnabled: boolean,
    public readonly flags: number,
    public readonly email: string | null,
    public readonly avatar: string | null,
    public readonly banner: string | undefined,
    public presence: /** presence **/ | undefined,
  ) {
  }

  public getDefaultAvatarUrl (): string {
    return `${Application.cdn}/embed/avatars/${this.discriminator}.png`
  }

  public getAvatarUrl (format = 'webp', size?, dynamic = false): string | null {
    format = dynamic && this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${Application.cdn}/avatars/${this.id}/${this.avatar}`, { format, size })
      : null
  }

  public async getBannerUrl (format = 'webp', size?, dynamic = false): Promise<string | null> {
    if (dynamic) format = this.avatar?.startsWith('a_') ? 'gif' : format
    return this.avatar
      ? this.makeImageUrl(`${Application.cdn}/banners/${this.id}/${this.banner}`, { format, size })
      : null
  }

  protected makeImageUrl (root, { format = 'webp', size = 256 }: { format?: any; size?: any } = {}) {
    return `${root}.${format}${size ? `?size=${size}` : ''}`
  }
}