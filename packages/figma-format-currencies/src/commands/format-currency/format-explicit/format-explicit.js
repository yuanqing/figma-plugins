import { addIsoCodeSuffix } from '../../../currency/add-iso-code-suffix'
import { formatCurrencyByLocale } from '../../../currency/format-currency-by-locale'
import { transformCurrencies } from '../../../currency/transform-currencies'

export function formatExplicit (characters, locale) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale
  }) {
    const result = formatCurrencyByLocale(value, isoCode, locale)
    return addIsoCodeSuffix(result, isoCode)
  })
}
