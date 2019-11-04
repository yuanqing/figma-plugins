import { addIsoCodeSuffix } from '../../currency/add-iso-code-suffix'
import { formatCurrencyByLocale } from '../../currency/format-currency-by-locale'
import { transformCurrencies } from '../../currency/transform-currencies'

export function convertCurrency (characters, locale, targetIsoCode) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale,
    isExplicitFormat
  }) {
    const convertedValue = value // * currencyConversionRates[isoCode][targetIsoCode]
    const result = formatCurrencyByLocale(convertedValue, targetIsoCode, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, targetIsoCode)
    }
    return result
  })
}
