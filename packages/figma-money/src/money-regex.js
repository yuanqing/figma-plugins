import { EN_DASH, MINUS } from './special-characters'

const pattern = [
  // minus
  `[${MINUS}${EN_DASH}-]?`, // eg. `-`

  // symbol prefix (with optional space)
  '(?:[^\\d\\n\\s]{1,4} ?)?', // eg. `$`, `Rs`. `OMF`, `FCFA`

  // incorrectly-positioned minus
  `[${MINUS}${EN_DASH}-]?`, // eg. `-`

  // v1, v2, v3
  '\\d{1,3}', // eg. `1`, `12`, or `123`
  '(?:[^\\d\\n]\\d{3})*', // eg. `,123`, `,123,456`, ...
  '(?:[^\\d\\n]\\d{1,5})?', // eg. `.1` up to `.12345`

  // symbol suffix (with optional space)
  '(?: ?[^\\d\\n\\s]{1,4})?', // eg. `$`, `Rs`, `OMF`, `FCFA`

  // iso code (with optional space)
  '(?: ?[A-Z]{3})?' // eg. `USD`
]
  .map(function (pattern) {
    return `(${pattern})`
  })
  .join('')

export const moneyRegex = new RegExp(pattern, 'g')
