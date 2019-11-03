import { addIsoCodeSuffix } from '../add-iso-code-suffix'
import { format } from '../format'
import { formatCurrency } from '../format-currency'

export function formatExplicit (characters, locale) {
  return format(characters, locale, function ({ value, isoCode, locale }) {
    const result = formatCurrency(value, isoCode, locale)
    return addIsoCodeSuffix(result, isoCode)
  })
}
