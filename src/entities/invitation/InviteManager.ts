import { Collection } from '@mineralts/core'
import Invite from './Invite'

export default class InviteManager {
  public cache: Collection<string, Invite> = new Collection()
}