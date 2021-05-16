import { addCurrencyCodeSuffix } from '../add-currency-code-suffix.js'
import { formatCurrencyByLocale } from '../format-currency-by-locale.js'
import { transformCurrencies } from '../transform-currencies/transform-currencies.js'
import { LocaleCode } from '../types.js'

export function formatRetain(string: string, localeCode: LocaleCode): string {
  return transformCurrencies(
    string,
    localeCode,
    function ({ currencyCode, isExplicitFormat, value }) {
      const result = formatCurrencyByLocale(value, { currencyCode, localeCode })
      if (isExplicitFormat === true) {
        return addCurrencyCodeSuffix(result, currencyCode)
      }
      return result
    }
  )
}
