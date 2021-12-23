import { Snowflake } from '../../types'
import Role from '../roles'

export default class Emoji {
  constructor (
    public id: Snowflake,
    public label: string,
    public isManaged: boolean,
    public isAvailable: boolean,
    public isAnimated: boolean = false,
    public roles: Role[] = [],
  ) {
  }
}