import { addCurrencyCodeSuffix } from '../add-currency-code-suffix.js'
import { formatCurrencyByLocale } from '../format-currency-by-locale.js'
import { transformCurrencies } from '../transform-currencies/transform-currencies.js'
import { LocaleCode } from '../types.js'

export function formatExplicit(string: string, localeCode: LocaleCode): string {
  return transformCurrencies(
    string,
    localeCode,
    function ({ currencyCode, value }) {
      const result = formatCurrencyByLocale(value, { currencyCode, localeCode })
      return addCurrencyCodeSuffix(result, currencyCode)
    }
  )
}
