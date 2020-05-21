import { SYMBOL_INDEX } from './data/constants'
const isoCodes = require('./data/iso-codes.json')

export function isValidSymbol(symbol: string): boolean {
  for (const isoCode of Object.keys(isoCodes)) {
    if (isoCodes[isoCode][SYMBOL_INDEX] === symbol) {
      return true
    }
  }
  return false
}
