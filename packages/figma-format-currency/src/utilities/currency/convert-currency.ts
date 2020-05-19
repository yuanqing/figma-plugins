import { addIsoCodeSuffix } from './add-iso-code-suffix'
import { computeExchangeRate } from './compute-exchange-rate'
import { formatCurrencyByLocale } from './format-currency-by-locale'
import { mapIsoCodeToDecimalPlaces } from './map-iso-code-to-decimal-places'
import { transformCurrencies } from './transform-currencies'

export function convertCurrency({
  string,
  targetCurrency,
  roundNumbers,
  locale
}) {
  return transformCurrencies(string, locale, function ({
    value,
    isoCode,
    isExplicitFormat
  }) {
    const exchangeRate = computeExchangeRate(isoCode, targetCurrency)
    let targetValue = value * exchangeRate
    if (roundNumbers === true) {
      targetValue = roundValue(targetValue, targetCurrency)
    }
    const result = formatCurrencyByLocale(targetValue, targetCurrency, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, targetCurrency)
    }
    return result
  })
}

function roundValue(value, isoCode) {
  const decimalPlaces = mapIsoCodeToDecimalPlaces(isoCode)
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
