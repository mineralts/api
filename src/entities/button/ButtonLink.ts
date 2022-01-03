import Emoji from '../emoji'
import BaseButton from './BaseButton'
import Application from '@mineralts/application'

export default class ButtonLink extends BaseButton {
  public url?: string

  constructor (
    props?: {
      label?: string,
      emoji?: string | Emoji,
      url: string
      disabled?: boolean
    }
  ) {
    if (props) super('LINK', props.label, undefined, props.disabled)
    else super('LINK', undefined, undefined)

    if (props?.emoji) {
      this.emoji = this.parseEmoji(props.emoji) as any
    }

    if (props?.url) {
      this.url = props.url
    }
  }

  public setUrl (url: string) {
    this.url = url
    return this
  }

  public toJson () {
    if (!this.url) {
      const logger = Application.getLogger()
      logger.error(`${this.label} component has not url.`)
      process.exit(0)
    }

    return {
      ...super.toJson(),
      url: this.url
    }
  }
}