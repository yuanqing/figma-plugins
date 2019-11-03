import { isValidIsoCode } from '../is-valid-iso-code'
import { isValidSymbol } from '../is-valid-symbol'
import { mapSymbolToIsoCode } from '../map-symbol-to-iso-code'
import { moneyRegex } from '../money-regex'
import { MINUS } from '../special-characters'

const numberRegex = /\d/
const spaceRegex = /\s/
const nonNumberRegex = /([^\d])/g
const dollarPrefixRegex = /[A-Z]{2}(?=\$)/g

export function formatFactory (transform) {
  return function (string, locale) {
    if (numberRegex.test(string) === false) {
      return string
    }
    return string.replace(moneyRegex, function (
      match,
      m1,
      originalPrefix,
      m2,
      v1,
      v2,
      v3,
      originalSuffix,
      originalIsoCode
    ) {
      if (originalIsoCode === '' && isValidIsoCode(originalSuffix.trim())) {
        originalIsoCode = originalSuffix
        originalSuffix = ''
      }
      const prefix = originalPrefix.trim()
      const suffix = originalSuffix.trim()
      let isoCode = originalIsoCode.trim()
      let before = ''
      let after = ''
      // try to parse `isoCode`
      if (isoCode !== '' && isValidIsoCode(isoCode) === false) {
        isoCode = ''
        after = `${originalIsoCode}${after}`
      }
      if (prefix !== '') {
        if (isoCode === '') {
          isoCode = mapSymbolToIsoCode(prefix, locale)
          if (isoCode !== '') {
            // `prefix` was consumed, so set `originalPrefix` to the empty string
            originalPrefix = ''
          }
        } else {
          if (isValidSymbol(prefix)) {
            // `prefix` is valid, so set `originalPrefix` to the empty string
            originalPrefix = ''
          }
        }
        before = `${before}${originalPrefix}`
      }
      if (suffix !== '') {
        if (isoCode === '') {
          isoCode = mapSymbolToIsoCode(suffix, locale)
          if (isoCode !== '') {
            // `suffix` was consumed, so set `originalSuffix` to the empty string
            originalSuffix = ''
          }
        } else {
          if (isValidSymbol(suffix)) {
            // `suffix` is valid, so set `originalPrefix` to the empty string
            originalSuffix = ''
          }
        }
        after = `${originalSuffix}${after}`
      }
      if (isoCode === '') {
        // bail because we cannot resolve an `isoCode`
        return match
      }
      const value = createValue(v1, v2, v3)
      let result = formatMoneyByLocale(value, isoCode, locale)
      result = result.replace(spaceRegex, ' ') // normalise spaces
      result = result.replace(dollarPrefixRegex, '') // strip the country prefix before `$`
      const minus = m1 !== '' || m2 !== '' ? MINUS : ''
      return `${before}${minus}${transform(result, isoCode)}${after}`
    })
  }
}

function createValue (v1, v2, v3) {
  let integerPart
  let fractionalPart
  if (v2.length === 0) {
    integerPart = v1
    fractionalPart = v3
  } else {
    const m = v2.match(nonNumberRegex)
    const firstIndex = v2.indexOf(m[0])
    const lastIndex = v2.lastIndexOf(m[m.length - 1])
    if (v2[firstIndex] === v2[lastIndex]) {
      integerPart = `${v1}${v2}`
      fractionalPart = v3
    } else {
      // the `fractionalPart` is within `v2`
      integerPart = `${v1}${v2.substring(0, lastIndex)}`
      fractionalPart = `${v2.substring(lastIndex)}`
    }
  }
  return parseFloat(
    `${integerPart.replace(nonNumberRegex, '')}${fractionalPart.replace(
      nonNumberRegex,
      '.'
    )}`
  )
}

function formatMoneyByLocale (value, currency, locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  )
}
