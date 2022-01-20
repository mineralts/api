export default class VoiceRegion {
  constructor (
    private id: string,
    private name: string,
    private optimal: boolean,
    private custom: boolean,
    private deprecated: boolean,
  ) {
  }

  public getId (): string {
    return this.id
  }

  public getName (): string {
    return this.name
  }

  public isOptimal (): boolean {
    return this.optimal
  }

  public isCustom (): boolean {
    return this.custom
  }

  public isDeprecated (): boolean {
    return this.deprecated
  }
}