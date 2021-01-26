import { addIsoCodeSuffix } from './add-iso-code-suffix'
import { formatCurrencyByLocale } from './format-currency-by-locale'
import { transformCurrencies } from './transform-currencies'

export function formatRetain(characters: string, locale: string): string {
  return transformCurrencies(
    characters,
    locale,
    function ({ value, isoCode, locale, isExplicitFormat }) {
      const result = formatCurrencyByLocale(value, isoCode, locale)
      if (isExplicitFormat === true) {
        return addIsoCodeSuffix(result, isoCode)
      }
      return result
    }
  )
}
