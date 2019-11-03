const spaceRegex = /\s/
const dollarPrefixRegex = /[A-Z]{2}(?=\$)/g

export function formatCurrency (value, isoCode, locale) {
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: isoCode
  }).format(value)
  return result
    .replace(spaceRegex, ' ') // normalise spaces
    .replace(dollarPrefixRegex, '') // strip the country prefix before `$`
}
