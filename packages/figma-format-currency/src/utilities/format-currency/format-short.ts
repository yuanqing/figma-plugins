import { formatCurrencyByLocale } from '../format-currency-by-locale.js'
import { transformCurrencies } from '../transform-currencies/transform-currencies.js'
import { LocaleCode } from '../types.js'

export function formatShort(string: string, localeCode: LocaleCode): string {
  return transformCurrencies(
    string,
    localeCode,
    function ({ currencyCode, value }) {
      return formatCurrencyByLocale(value, { currencyCode, localeCode })
    }
  )
}
