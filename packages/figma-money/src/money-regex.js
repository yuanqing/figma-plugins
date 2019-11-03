import { EN_DASH, HYPHEN, MINUS, SPACE } from './special-characters'

const ISO_CODE = '[A-Z]{3}'
const SYMBOL = '[A-Za-z$₵£¥₦₩₪₫€₱₹.]{1,4}'
const VALUE = '[\\d., ]*\\d'

const pattern = [
  // `m1`
  `[${MINUS}${EN_DASH}${HYPHEN}]?`, // eg. `-`

  // `prefix`
  `(?:${SYMBOL}${SPACE}?)?`, // eg. `$`, `Rs`. `OMF`, `FCFA`

  // `m2`
  `[${MINUS}${EN_DASH}${HYPHEN}]?`, // eg. `-`

  // `value`
  VALUE, // eg. `1`, `12`, or `123`

  // `suffix`
  `(?:${SPACE}?${SYMBOL})?`, // eg. `$`, `Rs`, `OMF`, `FCFA`

  // `isoCode`
  `(?:${SPACE}?${ISO_CODE})?` // eg. `USD`
]
  .map(function (pattern) {
    return `(${pattern})` // wrap in a capturing group
  })
  .join('')

export const moneyRegex = new RegExp(pattern, 'g')
