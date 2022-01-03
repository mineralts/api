import Emoji from '../emoji'
import { ButtonStyle } from '../../types'
import { keyFromEnum } from '../../utils'
import BaseButton from './BaseButton'
import Application from '@mineralts/application'

export default class Button extends BaseButton {
  public customId?: string

  constructor (
    props?: {
      style: Exclude<keyof typeof ButtonStyle, 'LINK'>
      label?: string,
      emoji?: string | Emoji,
      customId?: string
      disabled?: boolean
    }
  ) {
    if (props) super(props.style, props.label, undefined, props.disabled)
    else super(keyFromEnum(ButtonStyle, undefined) as keyof typeof ButtonStyle, undefined, undefined)

    if (props?.emoji) {
      this.emoji = this.parseEmoji(props.emoji) as any
    }

    if (props?.style) {
      this.style = props.style
    }

    if (props?.customId) {
      this.customId = props?.customId
    }
  }

  public setStyle (style: Exclude<keyof typeof ButtonStyle, 'LINK'>) {
    this.style = style
    return this
  }

  public setLabel (value: string) {
    this.label = value
    return this
  }

  public setCustomId (identifier: string) {
    this.customId = identifier
    return this
  }

  public setDisabled (value: boolean) {
    this.disabled = value
    return this
  }

  public setEmoji (emoji: string | Emoji) {
    this.emoji = this.parseEmoji(emoji) as any
    return this
  }

  public toJson () {
    if (!this.customId) {
      const logger = Application.getLogger()
      logger.error(`${this.label} component has not customId.`)
      process.exit(0)
    }

    return {
      ...super.toJson(),
      custom_id: this.customId
    }
  }
}