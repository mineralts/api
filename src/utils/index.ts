import Color from '../entities/colors'
export function resolveColor(color) {

  if (typeof color === 'string') {
    if (color === 'RANDOM') return Math.floor(Math.random() * (0xffffff + 1))
    if (color === 'DEFAULT') return 0
    if (color in Color) {
      color = parseInt(color.replace('#', ''), 16)
    }
  }

  if (color < 0 || color > 0xffffff) throw new RangeError('COLOR_RANGE')
  else if (Number.isNaN(color)) throw new TypeError('COLOR_CONVERT')

  return color
}

export function keyFromEnum<Enum> (entryEnum: Enum, payload: any) {
  return Object.keys(entryEnum)[Object.values(entryEnum).indexOf(payload)]
}

export function parseEmoji(text: string) {
  if (text.includes('%')) text = decodeURIComponent(text)
  if (!text.includes(':')) return { name: text, id: null }
  const match = text.match(/<?(?:(a):)?(\w{2,32}):(\d{17,19})?>?/)
  return match && { animated: Boolean(match[1]), name: match[2], id: match[3] ?? null }
}