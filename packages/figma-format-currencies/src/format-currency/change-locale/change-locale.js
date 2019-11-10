import { addIsoCodeSuffix } from '../../utilities/currency/add-iso-code-suffix'
import { formatCurrencyByLocale } from '../../utilities/currency/format-currency-by-locale'
import { transformCurrencies } from '../../utilities/currency/transform-currencies'

export function changeLocale (characters, locale) {
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
