import Activity from '../activity'
import GuildMember from '../guild/GuildMember'
import { PresenceStatus } from '../../types'

export default class Presence {
  constructor (
    private member: GuildMember,
    private status: keyof typeof PresenceStatus,
    private web: string | null,
    private desktop: string | null,
    private mobile: string | null,
    private activities: Activity[]
  ) {
  }

  public getMember (): GuildMember {
    return this.member
  }

  public getStatus (): keyof typeof PresenceStatus {
    return this.status
  }

  public getForWeb (): string | null {
    return this.web
  }

  public getForDesktop (): string | null {
    return this.desktop
  }

  public getForMobile (): string | null {
    return this.mobile
  }

  public getPresences (): Activity[] {
    return this.activities
  }
}