import { isValidIsoCode } from '../is-valid-iso-code'
import { isValidSymbol } from '../is-valid-symbol'
import { mapSymbolToIsoCode } from '../map-symbol-to-iso-code'
import { mapIsoCodeToDecimalPlaces } from '../map-iso-code-to-decimal-places'
import { moneyRegex } from '../money-regex'
import { MINUS } from '../special-characters'

const digitRegex = /\d/
const spaceRegex = /\s/
const nonDigitRegex = /([^\d])/g
const dollarPrefixRegex = /[A-Z]{2}(?=\$)/g

export function formatFactory (transform) {
  return function (string, locale) {
    if (digitRegex.test(string) === false) {
      return string
    }
    return string.replace(moneyRegex, function (
      match,
      m1,
      prefix,
      m2,
      value,
      suffix,
      isoCode
    ) {
      if (isoCode === '' && isValidIsoCode(suffix.trim())) {
        isoCode = suffix
        suffix = ''
      }
      const trimmedPrefix = prefix.trim()
      const trimmedSuffix = suffix.trim()
      let parsedIsoCode = isoCode.trim()
      let before = ''
      let after = ''
      // try to parse `isoCode`
      if (parsedIsoCode !== '' && isValidIsoCode(parsedIsoCode) === false) {
        parsedIsoCode = ''
        after = `${isoCode}${after}`
      }
      if (trimmedPrefix !== '') {
        if (parsedIsoCode === '') {
          parsedIsoCode = mapSymbolToIsoCode(trimmedPrefix, locale)
          if (parsedIsoCode !== '') {
            // `trimmedPrefix` is consumed
            prefix = ''
          }
        } else {
          if (isValidSymbol(trimmedPrefix)) {
            // `trimmedPrefix` is valid and is consumed
            prefix = ''
          }
        }
        before = `${before}${prefix}`
      }
      if (trimmedSuffix !== '') {
        if (parsedIsoCode === '') {
          parsedIsoCode = mapSymbolToIsoCode(trimmedSuffix, locale)
          if (parsedIsoCode !== '') {
            // `trimmedSuffix` is consumed
            suffix = ''
          }
        } else {
          if (isValidSymbol(trimmedSuffix)) {
            // `trimmedSuffix` is valid and is consumed
            suffix = ''
          }
        }
        after = `${suffix}${after}`
      }
      if (parsedIsoCode === '') {
        // bail because we cannot resolve an ISO code
        return match
      }
      const parsedValue = parseValue(value, parsedIsoCode)
      let result = formatMoneyByLocale(parsedValue, parsedIsoCode, locale)
      result = result.replace(spaceRegex, ' ') // normalise spaces
      result = result.replace(dollarPrefixRegex, '') // strip the country prefix before `$`
      const minus = m1 !== '' || m2 !== '' ? MINUS : ''
      return `${before}${minus}${transform(result, parsedIsoCode)}${after}`
    })
  }
}

function parseValue (value, isoCode) {
  const matches = value.match(nonDigitRegex)
  if (matches === null) {
    return value
  }
  if (mapIsoCodeToDecimalPlaces(isoCode) === 0) {
    return value.replace(nonDigitRegex, '')
  }
  const thousandsSeparator = matches[0]
  const decimalSeparator = matches[matches.length - 1]
  const firstIndex = value.indexOf(thousandsSeparator)
  const lastIndex = value.lastIndexOf(decimalSeparator)
  if (firstIndex === lastIndex) {
    return value.replace(nonDigitRegex, '.')
  }
  return value.replace(thousandsSeparator, '').replace(decimalSeparator, '.')
}

function formatMoneyByLocale (value, currency, locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  )
}
