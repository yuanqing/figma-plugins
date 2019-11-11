import { addIsoCodeSuffix } from '../utilities/currency/add-iso-code-suffix'
import { computeExchangeRate } from '../utilities/currency/compute-exchange-rate'
import { formatCurrencyByLocale } from '../utilities/currency/format-currency-by-locale'
import { transformCurrencies } from '../utilities/currency/transform-currencies'
import { mapIsoCodeToDecimalPlaces } from '../utilities/currency/map-iso-code-to-decimal-places'

export function convertCurrency ({
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

function roundValue (value, isoCode) {
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
