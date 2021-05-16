import { addCurrencyCodeSuffix } from '../add-currency-code-suffix.js'
import { formatCurrencyByLocale } from '../format-currency-by-locale.js'
import { mapCurrencyCodeToDecimalPlaces } from '../map-currency-code-to-decimal-places.js'
import { transformCurrencies } from '../transform-currencies/transform-currencies.js'
import { CurrencyCode, LocaleCode } from '../types.js'
import { computeExchangeRate } from './compute-exchange-rate.js'

export function convertCurrency(
  string: string,
  options: {
    currencyCode: CurrencyCode
    roundNumbers: boolean
    localeCode: LocaleCode
  }
): string {
  const {
    currencyCode: originalCurrencyCode,
    roundNumbers,
    localeCode
  } = options
  return transformCurrencies(
    string,
    localeCode,
    function ({ value, currencyCode: targetCurrencyCode, isExplicitFormat }) {
      const exchangeRate = computeExchangeRate(
        originalCurrencyCode,
        targetCurrencyCode
      )
      let targetValue = value * exchangeRate
      if (roundNumbers === true) {
        targetValue = roundValue(targetValue, targetCurrencyCode)
      }
      const result = formatCurrencyByLocale(targetValue, {
        currencyCode: targetCurrencyCode,
        localeCode
      })
      if (isExplicitFormat === true) {
        return addCurrencyCodeSuffix(result, targetCurrencyCode)
      }
      return result
    }
  )
}

function roundValue(value: number, currencyCode: string): number {
  const decimalPlaces = mapCurrencyCodeToDecimalPlaces(currencyCode)
  if (decimalPlaces === 0) {
    if (value > 1000) {
      return Math.trunc(value / 1000) * 1000
    }
    if (value > 100) {
      return Math.trunc(value / 100) * 100
    }
    return value
  }
  return Math.trunc(value)
}
