const spaceRegex = /\s/
const dollarPrefixRegex = /[A-Z]{2}(?=[$¥])/g

export function formatCurrencyByLocale(
  value: number,
  isoCode: string,
  locale: string
): string {
  const result = new Intl.NumberFormat(locale, {
    currency: isoCode,
    style: 'currency'
  }).format(value)
  return result
    .replace(spaceRegex, ' ') // normalise spaces
    .replace(dollarPrefixRegex, '') // strip the country prefix before `$`
}
