import { formatCurrencyByLocale } from '../../../currency/format-currency-by-locale'
import { transformCurrencies } from '../../../currency/transform-currencies'

export function formatShort (characters, locale) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale
  }) {
    return formatCurrencyByLocale(value, isoCode, locale)
  })
}
