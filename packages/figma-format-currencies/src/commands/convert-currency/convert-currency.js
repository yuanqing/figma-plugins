import { addIsoCodeSuffix } from '../../currency/add-iso-code-suffix'
import { computeExchangeRate } from '../../currency/compute-exchange-rate'
import { formatCurrencyByLocale } from '../../currency/format-currency-by-locale'
import { transformCurrencies } from '../../currency/transform-currencies'
import { mapIsoCodeToDecimalPlaces } from '../../currency/map-iso-code-to-decimal-places'

export function convertCurrency (
  characters,
  locale,
  targetIsoCode,
  roundNumbers
) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale,
    isExplicitFormat
  }) {
    const exchangeRate = computeExchangeRate(isoCode, targetIsoCode)
    let targetValue = value * exchangeRate
    if (roundNumbers) {
      targetValue = roundValue(targetValue, targetIsoCode)
    }
    const result = formatCurrencyByLocale(targetValue, targetIsoCode, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, targetIsoCode)
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
