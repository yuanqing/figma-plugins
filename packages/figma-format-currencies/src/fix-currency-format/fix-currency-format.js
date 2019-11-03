import { addIsoCodeSuffix } from '../add-iso-code-suffix'
import { format } from '../format'
import { formatCurrency } from '../format-currency'

export function fixCurrencyFormat (characters, locale) {
  return format(characters, locale, function ({
    value,
    isoCode,
    locale,
    isExplicitFormat
  }) {
    const result = formatCurrency(value, isoCode, locale)
    if (isExplicitFormat === true) {
      return addIsoCodeSuffix(result, isoCode)
    }
    return result
  })
}
