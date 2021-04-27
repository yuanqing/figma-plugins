import { currencies } from '../data/currencies'
import { EXCHANGE_RATE_INDEX } from '../data/currencies-index'
import { CurrencyCode } from '../types'

export function computeExchangeRate(
  originalCurrencyCode: CurrencyCode,
  targetCurrencyCode: CurrencyCode
): number {
  const sourceToUSD = currencies[originalCurrencyCode][EXCHANGE_RATE_INDEX]
  const targetToUSD = currencies[targetCurrencyCode][EXCHANGE_RATE_INDEX]
  return targetToUSD / sourceToUSD
}
