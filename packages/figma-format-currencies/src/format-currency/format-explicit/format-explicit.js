import { addIsoCodeSuffix } from '../../utilities/currency/add-iso-code-suffix'
import { formatCurrencyByLocale } from '../../utilities/currency/format-currency-by-locale'
import { transformCurrencies } from '../../utilities/currency/transform-currencies'

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
