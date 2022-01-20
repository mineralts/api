import { Snowflake } from '../../types'
import Role from '../roles'

export default class Emoji {
  constructor (
    private id: Snowflake,
    private label: string,
    private managed: boolean,
    private available: boolean,
    private animated: boolean = false,
    private roles: Role[] = [],
  ) {
  }

  public getId (): Snowflake {
    return this.id
  }

  public getLabel (): string {
    return this.label
  }

  public isManaged (): boolean {
    return this.managed
  }

  public isAvailable (): boolean {
    return this.available
  }

  public isAnimated (): boolean {
    return this.animated
  }

  public getRoles (): Role[] {
    return this.roles
  }
}