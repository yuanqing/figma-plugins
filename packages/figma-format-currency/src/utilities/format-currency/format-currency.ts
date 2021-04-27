import { CurrencyFormat, LocaleCode } from '../types'
import { formatExplicit } from './format-explicit'
import { formatRetain } from './format-retain'
import { formatShort } from './format-short'

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
