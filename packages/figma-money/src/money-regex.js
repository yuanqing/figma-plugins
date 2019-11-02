import { EN_DASH, MINUS } from './special-characters'
import symbolToIsoCodeMap from './symbol-to-iso-codes-map.json'

const specialCharactersRegex = /([.$])/

function escapeSpecialCharacters (pattern) {
  return pattern.replace(specialCharactersRegex, function (match, p1) {
    return `\\${p1}`
  })
}

const minus = `([${MINUS}${EN_DASH}-])?`

const currencySymbol = [
  '(',
  escapeSpecialCharacters(Object.keys(symbolToIsoCodeMap).join('|')), // eg `$`
  ')'
].join('')

const prefix = [
  '(?:',
  currencySymbol, // eg. `$` or `CHF`
  ' ?)?' // optional single space after the currency symbol
].join('')

const suffix = [
  '(?: ', // single space before the currency symbol
  currencySymbol, // eg. `$` or `CHF`
  ')?'
].join('')

const isoCodes = (function () {
  let result = []
  for (const symbol of Object.keys(symbolToIsoCodeMap)) {
    const value = symbolToIsoCodeMap[symbol]
    if (typeof value === 'string') {
      result.push(value)
      continue
    }
    result = result.concat(value.isoCodes)
  }
  return result.sort()
})()
const currencyIsoCode = [
  '(?: ', // single space before the currency ISO code
  '(',
  isoCodes.join('|'), // eg. `CHF`
  ')',
  ')?'
].join('')

const value = [
  '(',
  '\\d{1,3}', // eg. `123`
  ')',
  '(',
  '(?:[^\\d]\\d{3})*', // eg. `,456,789`
  ')',
  '(',
  '(?:',
  '[^\\d]\\d{1,5}', // eg. `.00`
  ')?',
  ')'
].join('')

const pattern = [minus, prefix, value, suffix, currencyIsoCode].join('')

export const moneyRegex = new RegExp(pattern, 'g')
