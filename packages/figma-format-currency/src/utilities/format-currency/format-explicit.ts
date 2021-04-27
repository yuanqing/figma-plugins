import { addCurrencyCodeSuffix } from '../add-currency-code-suffix'
import { formatCurrencyByLocale } from '../format-currency-by-locale'
import { transformCurrencies } from '../transform-currencies/transform-currencies'
import { LocaleCode } from '../types'

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
