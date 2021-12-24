import Emoji from '../emoji'
import { ButtonStyle } from '../../types'
import { parseEmoji } from '../../utils'

export default class BaseButton {
  constructor (
    public style: keyof typeof ButtonStyle,
    public label?: string,
    public emoji?: string | Emoji,
    public disabled: boolean = false,
  ) {
  }

  public setStyle (style: keyof typeof ButtonStyle) {
    this.style = style
    return this
  }

  public setLabel (value: string) {
    this.label = value
    return this
  }

  public setEmoji (emoji: string | Emoji) {
    this.emoji = this.parseEmoji(emoji) as any
    return this
  }

  public setDisabled (value: boolean) {
    this.disabled = value
    return this
  }

  protected parseEmoji (emoji: string | Emoji) {
    if (typeof emoji === 'string') {
      return parseEmoji(emoji)
    }
  }

  protected toJson () {
    return {
      style: ButtonStyle[this.style],
      label: this.label,
      emoji: this.emoji,
      disabled: this.disabled,
    }
  }
}