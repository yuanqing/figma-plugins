import { currencies } from './data/currencies'
import { DECIMAL_PLACES_INDEX } from './data/currencies-index'
import { CurrencyCode } from './types'

export function mapCurrencyCodeToDecimalPlaces(currencyCode: string): number {
  return currencies[currencyCode as CurrencyCode][DECIMAL_PLACES_INDEX]
}
