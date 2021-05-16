import { CurrencyFormat, LocaleCode } from '../types.js'
import { formatExplicit } from './format-explicit.js'
import { formatRetain } from './format-retain.js'
import { formatShort } from './format-short.js'

const currencyFormatters: Record<
  CurrencyFormat,
  (string: string, localeCode: LocaleCode) => string
> = {
  EXPLICIT: formatExplicit,
  RETAIN: formatRetain,
  SHORT: formatShort
}

export function formatCurrency(
  value: string,
  options: { currencyFormat: CurrencyFormat; localeCode: LocaleCode }
): string {
  const { currencyFormat, localeCode } = options
  return currencyFormatters[currencyFormat](value, localeCode)
}
