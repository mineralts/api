import { ComponentType, MenuSelect, MenuSelectOption } from '../../types'
import Application from '@mineralts/application'
import { parseEmoji } from '../../utils'

export default class SelectMenu {
  private type: ComponentType = ComponentType.SELECT_MENU
  private customId: string | undefined
  private minValues = 1
  private maxValues = 1
  private placeholder?: string
  private disabled = false
  private readonly choices: MenuSelectOption[] = []

  constructor (options?: MenuSelect) {
    if (options) {
      this.customId = options?.customId
      this.minValues = options?.minValues || 1
      this.maxValues = options?.maxValues || 1
      this.placeholder = options?.placeholder
      this.disabled = options?.disabled || false
      this.choices = options.choices
    }
  }

  public getCustomId (): string | undefined {
    return this.customId
  }

  public setCustomId (identifier: string) {
    this.customId = identifier
    return this
  }

  public getMinValue (): number| undefined {
    return this.minValues
  }

  public setMinimalValue (value: number) {
    this.minValues = value
    return this
  }

  public getMaxValue (): number| undefined {
    return this.maxValues
  }

  public setMaximalValue (value: number) {
    this.maxValues = value
    return this
  }

  public getPlaceholder (): string | undefined {
    return this.placeholder
  }

  public setPlaceholder (value: string) {
    this.placeholder = value
    return this
  }

  public isDisabled (): boolean {
    return this.disabled
  }

  public setDisabled (value: boolean) {
    this.disabled = value
    return this
  }

  public getOptions (): { label: string, value: unknown, description?: string, emoji?: any, default?: boolean }[] {
    return this.choices
  }

  public addOption (option: { label: string, value: unknown, description?: string, emoji?: any, default?: boolean }) {
    this.choices.push(option)
    return this
  }

  public toJson () {
    if (!this.customId) {
      const logger = Application.getLogger()
      logger.error('Select menu component has not customId.')
      process.exit(0)
    }

    return {
      type: this.type,
      custom_id: this.customId,
      min_values: this.minValues,
      max_values: this.maxValues,
      placeholder: this.placeholder,
      disabled: this.disabled,
      options: this.choices.map((option: MenuSelectOption) => ({
        label: option.label,
        value: option.value,
        description: option.description,
        emoji: option.emoji
          ? parseEmoji(option.emoji as string)
          : null,
        default: option.default,
      })),
    }
  }
}