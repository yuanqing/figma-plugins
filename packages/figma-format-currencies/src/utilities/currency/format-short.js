import { formatCurrencyByLocale } from './format-currency-by-locale'
import { transformCurrencies } from './transform-currencies'

export function formatShort (characters, locale) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale
  }) {
    return formatCurrencyByLocale(value, isoCode, locale)
  })
}
