import { currencies } from './data/currencies.js'
import { DECIMAL_PLACES_INDEX } from './data/currencies-index.js'
import { CurrencyCode } from './types.js'

export function mapCurrencyCodeToDecimalPlaces(currencyCode: string): number {
  return currencies[currencyCode as CurrencyCode][DECIMAL_PLACES_INDEX]
}
