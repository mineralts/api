import Emoji from '../emoji'
import { parseEmoji } from '../../utils'

export default class BaseButton {
  constructor (
    private label?: string,
    private emoji?: string | Emoji,
    private disabled: boolean = false,
  ) {
  }

  public getLabel (): string | undefined {
    return this.label
  }

  public setLabel (value: string) {
    this.label = value
    return this
  }

  public getEmoji (): string | Emoji | undefined {
    return this.label
  }

  public setEmoji (emoji: string | Emoji) {
    this.emoji = this.parseEmoji(emoji) as any
    return this
  }

  public isDisabled (): boolean {
    return this.disabled
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
      label: this.getLabel(),
      emoji: this.getEmoji(),
      disabled: this.isDisabled(),
    }
  }
}