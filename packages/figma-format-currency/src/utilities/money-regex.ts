import { EN_DASH, HYPHEN, MINUS, SPACE } from './special-characters.js'

const CURRENCY_CODE = '[A-Z]{3}'
const CURRENCY_SYMBOL = '[A-Za-z$₵£¥₦₩₪₫€₱₹.]{1,4}'
const VALUE = '[\\d., ]*\\d'

const pattern = [
  // `m1`
  `[${MINUS}${EN_DASH}${HYPHEN}]?`, // eg. `-`

  // `prefix`
  `(?:${CURRENCY_SYMBOL}${SPACE}?)?`, // eg. `$`, `Rs`. `OMF`, `FCFA`

  // `m2`
  `[${MINUS}${EN_DASH}${HYPHEN}]?`, // eg. `-`

  // `value`
  VALUE, // eg. `1`, `12`, or `123`

  // `suffix`
  `(?:${SPACE}?${CURRENCY_SYMBOL})?`, // eg. `$`, `Rs`, `OMF`, `FCFA`

  // `currencyCode`
  `(?:${SPACE}?${CURRENCY_CODE})?` // eg. `USD`
]
  .map(function (pattern) {
    return `(${pattern})` // wrap in a capturing group
  })
  .join('')

export const moneyRegex = new RegExp(pattern, 'g')
