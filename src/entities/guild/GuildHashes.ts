import { Hash } from '../../types'

export default class GuildHashes {
  constructor (
    private roles: Hash,
    private metadata: Hash,
    private channels: Hash,
  ) {
  }

  public getRoles (): Hash {
    return this.roles
  }

  public getMetadata (): Hash {
    return this.metadata
  }

  public getChannels (): Hash {
    return this.channels
  }
}