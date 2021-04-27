import { currencies } from '../data/currencies'
import { CurrencyCode } from '../types'

export function isValidCurrencyCode(currencyCode: string): boolean {
  return typeof currencies[currencyCode as CurrencyCode] !== 'undefined'
}
