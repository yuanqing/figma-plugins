import { currencies } from '../data/currencies.js'
import { CurrencyCode } from '../types.js'

export function isValidCurrencyCode(currencyCode: string): boolean {
  return typeof currencies[currencyCode as CurrencyCode] !== 'undefined'
}
