import { LocaleCode } from './types.js'

const spaceRegex = /\s/
const dollarPrefixRegex = /[A-Z]{2}(?=[$¥])/g

export function formatCurrencyByLocale(
  value: number,
  options: {
    currencyCode: string
    localeCode: LocaleCode
  }
): string {
  const { currencyCode, localeCode } = options
  const result = new Intl.NumberFormat(localeCode, {
    currency: currencyCode,
    style: 'currency'
  }).format(value)
  return result
    .replace(spaceRegex, ' ') // normalise spaces
    .replace(dollarPrefixRegex, '') // strip the country prefix before `$`
}
