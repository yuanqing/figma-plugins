const isoCodes = require('../src/data/iso-codes.json')
const sortObjectByKey = require('./sort-object-by-key')

let result
result = mapIsoCodeToDecimalPlaces()
result = sortObjectByKey(result)
console.log(JSON.stringify(result, null, 2))

function mapIsoCodeToDecimalPlaces () {
  const isoCodeRegex = /\s?[A-Z]{3}\s?/
  const nonDigitRegex = /([^\d])/g
  const result = {}
  for (const isoCode of isoCodes) {
    const locale = isoCode.substring(0, 2).toLowerCase()
    const string = new Intl.NumberFormat(`en-${locale}`, {
      style: 'currency',
      currency: isoCode,
      currencyDisplay: 'code'
    }).format(123456789.123456789)
    const value = string.replace(isoCodeRegex, '')
    const matches = value.match(nonDigitRegex)
    const thousandsSeparator = matches[0]
    const decimalSeparator = matches[matches.length - 1]
    if (thousandsSeparator === decimalSeparator) {
      result[isoCode] = 0
      continue
    }
    const decimalIndex = value.lastIndexOf(decimalSeparator)
    result[isoCode] = value.length - decimalIndex - 1
  }
  return result
}
