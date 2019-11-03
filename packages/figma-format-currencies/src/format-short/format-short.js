import { format } from '../format'
import { formatCurrency } from '../format-currency'

export function formatShort (characters, locale) {
  return format(characters, locale, function ({ value, isoCode, locale }) {
    return formatCurrency(value, isoCode, locale)
  })
}
