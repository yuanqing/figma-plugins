const isoCodeRegex = '(?: ([A-Z]{3}))?'

export function createRegex (pattern) {
  return new RegExp(pattern.join('') + isoCodeRegex, 'g')
}
