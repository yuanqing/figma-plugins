import { formatCurrencyByLocale } from '../format-currency-by-locale'
import { transformCurrencies } from '../transform-currencies/transform-currencies'
import { LocaleCode } from '../types'

export function formatShort(string: string, localeCode: LocaleCode): string {
  return transformCurrencies(
    string,
    localeCode,
    function ({ currencyCode, value }) {
      return formatCurrencyByLocale(value, { currencyCode, localeCode })
    }
  )
}
