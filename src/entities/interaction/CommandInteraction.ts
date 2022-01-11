import {
  ChannelResolvable, CommandParamsResolvable,
  ComponentType,
  InteractionType,
  MessageComponentResolvable,
  MessageOption,
  Snowflake
} from '../../types'
import Message from '../message'
import GuildMember from '../guild/GuildMember'
import Application from '@mineralts/application'
import EmbedRow from '../embed/EmbedRow'

export default class CommandInteraction {
  constructor (
    public readonly id: Snowflake,
    public readonly version: number,
    public readonly type: keyof typeof InteractionType,
    public readonly token: string,
    public readonly customId: string | undefined,
    public readonly componentType: keyof typeof ComponentType | undefined,
    public readonly message: Message | undefined,
    public readonly member: GuildMember,
    public params: any,
  ) {
  }

  public async reply (messageOption: MessageOption): Promise<void> {
    const request = Application.createRequest()
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson()
      }) as any[]
      return row
    })

    await request.post(`/interactions/${this.id}/${this.token}/callback`, {
      type: InteractionType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        ...messageOption,
        components,
        flags: messageOption.isClientSide ? 1 << 6 : undefined,
      }
    })
  }

  public getChannel (name: string): ChannelResolvable | undefined {
    console.log(this.params)
    const channel = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: Snowflake }
    return this.member.guild.channels.cache.get(channel?.value)
  }

  public getMember (name: string): GuildMember | undefined {
    const channel = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: Snowflake }
    return this.member.guild.members.cache.get(channel?.value)
  }

  public getString (name: string): string | undefined {
    const stringValue = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: string }
    return stringValue.value
  }

  public getNumber (name: string): number | undefined {
    const numberValue = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: number }
    return numberValue.value
  }

  public getBoolean (name: string): boolean | undefined {
    const numberValue = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: boolean }
    return numberValue.value
  }

  public getChoices<T> (name: string): T | undefined {
    const choiceValue = this.params.options?.find((param: CommandParamsResolvable) => param.name == name) as unknown as { value: T }
    return choiceValue.value
  }
}