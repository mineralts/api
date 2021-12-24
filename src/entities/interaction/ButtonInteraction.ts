import { InteractionType, MessageComponentResolvable, MessageOption, RequestOptions, Snowflake } from '../../types'
import Message from '../message'
import GuildMember from '../guild/GuildMember'
import Button from '../button'
import Interaction from './index'
import EmbedRow from '../embed/EmbedRow'

export default class ButtonInteraction extends Interaction {
  constructor (
    id: Snowflake,
    version: number,
    token: string,
    message: Message,
    member: GuildMember,
    public component: Button | undefined,
  ) {
    super(id, version, 'MESSAGE_COMPONENT', token, component?.customId, 'BUTTON', message, member)
  }

  public async pass () {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    // await request.post({
    //   type: InteractionType.DEFERRED_UPDATE_MESSAGE,
    //   data: {
    //     flags: null,
    //   },
    // })
  }

  public async reply (messageOption: MessageOption, option?: RequestOptions): Promise<void> {
    const request = new Request(`/interactions/${this.id}/${this.token}/callback`)
    const components = messageOption.components?.map((row: EmbedRow) => {
      row.components = row.components.map((component: MessageComponentResolvable) => {
        return component.toJson()
      }) as any[]
      return row
    })

    // await request.post({
    //   type: InteractionType.CHANNEL_MESSAGE_WITH_SOURCE,
    //   data: {
    //     ...messageOption,
    //     components,
    //     flags: messageOption.isClientSide ? 1 << 6 : undefined,
    //   }
    // }, option)
  }
}