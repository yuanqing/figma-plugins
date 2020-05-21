import { isValidIsoCode } from './is-valid-iso-code'
import { isValidSymbol } from './is-valid-symbol'
import { mapIsoCodeToDecimalPlaces } from './map-iso-code-to-decimal-places'
import { mapSymbolToIsoCode } from './map-symbol-to-iso-code'
import { moneyRegex } from './money-regex'
import { MINUS } from './special-characters'

const digitRegex = /\d/
const nonDigitRegex = /([^\d])/g

export function transformCurrencies(
  string: string,
  locale: string,
  transform: (options: {
    value: number
    isoCode: string
    locale: string
    isExplicitFormat: boolean
  }) => string
): string {
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
    let before = ''
    let after = ''
    if (
      isValidIsoCode(isoCode.trim()) === false &&
      isValidIsoCode(suffix.trim()) === true
    ) {
      // `isoCode` is an invalid match, so put it in `after`
      after = `${isoCode}${after}`
      isoCode = suffix
      suffix = ''
    }
    const trimmedPrefix = prefix.trim()
    const trimmedSuffix = suffix.trim()
    let parsedIsoCode = isoCode.trim()
    let isExplicitFormat = false
    // try to parse `isoCode`
    if (isValidIsoCode(parsedIsoCode) === true) {
      isExplicitFormat = true
    } else {
      after = `${isoCode}${after}`
      parsedIsoCode = ''
    }
    if (trimmedPrefix !== '') {
      if (parsedIsoCode === '') {
        // try to parse an ISO code from `trimmedPrefix`
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
        // try to parse an ISO code from `trimmedSuffix`
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
    const minus = m1 !== '' || m2 !== '' ? MINUS : ''
    return `${before}${minus}${transform({
      value: parseFloat(parsedValue),
      isoCode: parsedIsoCode,
      locale,
      isExplicitFormat
    })}${after}`
  })
}

const separatorRegexes: { [key: string]: any } = {
  ' ': /\s/g,
  ',': /,/g,
  '.': /\./g
}

function parseValue(value: string, isoCode: string): string {
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
  return value
    .replace(separatorRegexes[thousandsSeparator], '')
    .replace(separatorRegexes[decimalSeparator], '.')
}
