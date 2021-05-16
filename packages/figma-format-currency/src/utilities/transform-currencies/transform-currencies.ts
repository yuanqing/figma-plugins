import { mapCurrencyCodeToDecimalPlaces } from '../map-currency-code-to-decimal-places.js'
import { moneyRegex } from '../money-regex.js'
import { MINUS } from '../special-characters.js'
import { CurrencyCode, LocaleCode } from '../types.js'
import { isValidCurrencyCode } from './is-valid-currency-key.js'
import { isValidCurrencySymbol } from './is-valid-currency-symbol.js'
import { mapCurrencySymbolToCurrencyCode } from './map-currency-symbol-to-currency-key.js'

const digitRegex = /\d/
const nonDigitRegex = /([^\d])/g

export function transformCurrencies(
  string: string,
  localeCode: LocaleCode,
  transform: (options: {
    currencyCode: CurrencyCode
    isExplicitFormat: boolean
    value: number
  }) => string
): string {
  if (digitRegex.test(string) === false) {
    return string
  }
  return string.replace(
    moneyRegex,
    function (
      _,
      m1: string,
      prefix: string,
      m2: string,
      value: string,
      suffix: string,
      currencyCode: string
    ) {
      let before = ''
      let after = ''
      if (
        isValidCurrencyCode(currencyCode.trim()) === false &&
        isValidCurrencyCode(suffix.trim()) === true
      ) {
        // `currencyCode` is an invalid match, so put it in `after`
        after = `${currencyCode}${after}`
        currencyCode = suffix
        suffix = ''
      }
      const trimmedPrefix = prefix.trim()
      const trimmedSuffix = suffix.trim()
      let parsedCurrencyCode = currencyCode.trim()
      let isExplicitFormat = false
      // try to parse `currencyCode`
      if (isValidCurrencyCode(parsedCurrencyCode) === true) {
        isExplicitFormat = true
      } else {
        after = `${currencyCode}${after}`
        parsedCurrencyCode = ''
      }
      if (trimmedPrefix !== '') {
        if (parsedCurrencyCode === '') {
          // try to parse a currency code from `trimmedPrefix`
          parsedCurrencyCode = mapCurrencySymbolToCurrencyCode(
            trimmedPrefix,
            localeCode
          )
          if (parsedCurrencyCode !== '') {
            // `trimmedPrefix` is consumed
            prefix = ''
          }
        } else {
          if (isValidCurrencySymbol(trimmedPrefix)) {
            // `trimmedPrefix` is valid and is consumed
            prefix = ''
          }
        }
        before = `${before}${prefix}`
      }
      if (trimmedSuffix !== '') {
        if (parsedCurrencyCode === '') {
          // try to parse a currency code from `trimmedSuffix`
          parsedCurrencyCode = mapCurrencySymbolToCurrencyCode(
            trimmedSuffix,
            localeCode
          )
          if (parsedCurrencyCode !== '') {
            // `trimmedSuffix` is consumed
            suffix = ''
          }
        } else {
          if (isValidCurrencySymbol(trimmedSuffix)) {
            // `trimmedSuffix` is valid and is consumed
            suffix = ''
          }
        }
        after = `${suffix}${after}`
      }
      if (parsedCurrencyCode === '') {
        // bail because we cannot resolve a currency code
        return _
      }
      const parsedValue = parseValue(value, parsedCurrencyCode as CurrencyCode)
      const minus = m1 !== '' || m2 !== '' ? MINUS : ''
      return `${before}${minus}${transform({
        currencyCode: parsedCurrencyCode as CurrencyCode,
        isExplicitFormat,
        value: parseFloat(parsedValue)
      })}${after}`
    }
  )
}

const separatorRegexes: { [key: string]: any } = {
  ' ': /\s/g,
  ',': /,/g,
  '.': /\./g
}

function parseValue(value: string, currencyCode: CurrencyCode): string {
  const matches = value.match(nonDigitRegex)
  if (matches === null) {
    return value
  }
  if (mapCurrencyCodeToDecimalPlaces(currencyCode) === 0) {
    return value.replace(nonDigitRegex, '')
  }
  const thousandsSeparator = matches[0]
  const decimalSeparator = matches[matches.length - 1]
  const firstIndex = value.indexOf(thousandsSeparator)
  const lastIndex = value.lastIndexOf(decimalSeparator)
  if (firstIndex === lastIndex) {
    return value.replace(nonDigitRegex, '.')
  }
  return value
    .replace(separatorRegexes[thousandsSeparator], '')
    .replace(separatorRegexes[decimalSeparator], '.')
}
