import Emoji from '../emoji'
import BaseButton from './BaseButton'
import Application from '@mineralts/application'
import { ButtonStyle } from '../../types'

export default class ButtonLink extends BaseButton {
  public url?: string
  private style: keyof typeof ButtonStyle = 'LINK'

  constructor (
    props?: {
      label?: string,
      emoji?: string | Emoji,
      url: string
      disabled?: boolean
    }
  ) {
    if (props) super(props.label, undefined, props.disabled)
    else super(undefined, undefined, undefined)

    if (props?.emoji) {
      this.setEmoji(this.parseEmoji(props.emoji) as any)
    }

    if (props?.url) {
      this.url = props.url
    }
  }

  public getStyle (): keyof typeof ButtonStyle {
    return this.style
  }

  public getUrl (): string | undefined {
    return this.url
  }

  public setUrl (url: string) {
    this.url = url
    return this
  }

  public toJson () {
    if (!this.url) {
      const logger = Application.getLogger()
      logger.error(`${this.getLabel()} component has not url.`)
      process.exit(0)
    }

    return {
      ...super.toJson(),
      style: ButtonStyle[this.getStyle()],
      url: this.url
    }
  }
}