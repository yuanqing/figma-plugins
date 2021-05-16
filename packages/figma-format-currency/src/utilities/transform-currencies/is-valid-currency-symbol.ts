import { currencies } from '../data/currencies.js'
import { SYMBOL_INDEX } from '../data/currencies-index.js'
import { CurrencyCode } from '../types.js'

export function isValidCurrencySymbol(currencySymbol: string): boolean {
  for (const currencyCode in currencies) {
    if (
      currencies[currencyCode as CurrencyCode][SYMBOL_INDEX] === currencySymbol
    ) {
      return true
    }
  }
  return false
}
