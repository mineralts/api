export default class IntegrationAccount {
  constructor (
    protected id: string,
    protected name: string,
  ) {
  }

  public getId (): string {
    return this.id
  }

  public getName (): string {
    return this.name
  }
}