import { addIsoCodeSuffix } from '../../../currency/add-iso-code-suffix'
import { formatCurrencyByLocale } from '../../../currency/format-currency-by-locale'
import { transformCurrencies } from '../../../currency/transform-currencies'

export function fixCurrencyFormat (characters, locale) {
  return transformCurrencies(characters, locale, function ({
    value,
    isoCode,
    locale,
    isExplicitFormat
  }) {
    const result = formatCurrencyByLocale(value, isoCode, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, isoCode)
    }
    return result
  })
}
