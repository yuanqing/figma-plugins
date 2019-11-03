import { addIsoCodeSuffix } from '../add-iso-code-suffix'
import { format } from '../format'
import { formatCurrency } from '../format-currency'
import currencyConversionRates from '../data/currency-conversion-rates'

export function convertCurrency (characters, locale, targetIsoCode) {
  return format(characters, locale, function ({
    value,
    isoCode,
    locale,
    isExplicitFormat
  }) {
    const convertedValue =
      value * currencyConversionRates[isoCode][targetIsoCode]
    const result = formatCurrency(convertedValue, targetIsoCode, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, targetIsoCode)
    }
    return result
  })
}
