import { currencies } from '../data/currencies'
import { SYMBOL_INDEX } from '../data/currencies-index'
import { CurrencyCode } from '../types'

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
