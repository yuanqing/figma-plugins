import { currencies } from '../data/currencies'
import { SYMBOL_INDEX } from '../data/currencies-index'
import { CurrencyCode, LocaleCode } from '../types'
import { isValidCurrencyCode } from './is-valid-currency-key'

export function mapCurrencySymbolToCurrencyCode(
  currencySymbol: string,
  localeCode: LocaleCode
): '' | CurrencyCode {
  const currencyCodes: Array<CurrencyCode> = findCurrencyCodesWithSymbol(
    currencySymbol
  )
  if (currencyCodes.length === 0) {
    return isValidCurrencyCode(currencySymbol) === true
      ? (currencySymbol as CurrencyCode)
      : ''
  }
  if (currencyCodes.length === 1) {
    return currencyCodes[0]
  }
  const split = localeCode.split(/-/)
  const countryCode = split[split.length === 1 ? 0 : 1].toUpperCase()
  for (const currencyCode of currencyCodes) {
    if (currencyCode.substring(0, 2) === countryCode) {
      return currencyCode
    }
  }
  // Default case
  if (currencySymbol === '£') {
    return 'GBP'
  }
  if (currencySymbol === '¥') {
    return 'JPY'
  }
  if (currencySymbol === '$') {
    return 'USD'
  }
  return currencyCodes[0]
}

function findCurrencyCodesWithSymbol(symbol: string): Array<CurrencyCode> {
  const result: Array<CurrencyCode> = []
  for (const currencyCode in currencies) {
    if (currencies[currencyCode as CurrencyCode][SYMBOL_INDEX] === symbol) {
      result.push(currencyCode as CurrencyCode)
    }
  }
  return result
}
