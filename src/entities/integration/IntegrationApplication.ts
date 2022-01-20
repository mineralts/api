import User from '../user'

export default class IntegrationApplication {
  constructor (
    protected id: string,
    protected name: string,
    protected description: string,
    protected icon: string | undefined,
    protected summary: string,
    protected bot: User,
  ) {
  }

  public getId (): string {
    return this.id
  }

  public getName (): string {
    return this.name
  }

  public getDescription (): string {
    return this.description
  }

  public getIcon (): string | undefined {
    return this.icon
  }

  public getSummary (): string {
    return this.summary
  }

  public getBot (): User {
    return this.bot
  }
}