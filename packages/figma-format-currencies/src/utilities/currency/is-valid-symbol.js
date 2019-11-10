import { SYMBOL_INDEX } from './data/constants'
import isoCodes from './data/iso-codes'

export function isValidSymbol (symbol) {
  for (const isoCode of Object.keys(isoCodes)) {
    if (isoCodes[isoCode][SYMBOL_INDEX] === symbol) {
      return true
    }
  }
  return false
}
