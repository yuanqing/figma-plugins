import { addCurrencyCodeSuffix } from '../add-currency-code-suffix'
import { formatCurrencyByLocale } from '../format-currency-by-locale'
import { transformCurrencies } from '../transform-currencies/transform-currencies'
import { LocaleCode } from '../types'

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
