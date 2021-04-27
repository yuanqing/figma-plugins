import { CurrencyCode } from './types'

export function addCurrencyCodeSuffix(
  string: string,
  currencyCode: CurrencyCode
): string {
  if (string.indexOf(currencyCode) === -1) {
    return `${string} ${currencyCode}`
  }
  return string
}
