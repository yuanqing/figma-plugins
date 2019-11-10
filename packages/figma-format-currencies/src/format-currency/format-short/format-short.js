import { formatCurrencyByLocale } from '../../utilities/currency/format-currency-by-locale'
import { transformCurrencies } from '../../utilities/currency/transform-currencies'

export function formatShort (characters, locale) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale
  }) {
    return formatCurrencyByLocale(value, isoCode, locale)
  })
}
