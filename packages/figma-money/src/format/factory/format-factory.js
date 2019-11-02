import { moneyRegex } from '../../money-regex'
import { MINUS } from '../../special-characters'
import { mapSymbolToIsoCode } from '../../map-symbol-to-iso-code'

const spaceRegex = /\s/
const nonDigitRegex = /([^\d])/g
const dollarPrefixRegex = /[A-Z]{2}(?=\$)/g

export function formatFactory (isExplicit) {
  return function (string, locale) {
    return string.replace(moneyRegex, function (
      match,
      minus,
      symbolPrefix,
      v1,
      v2,
      v3,
      symbolSuffix,
      isoCode
    ) {
      if (
        typeof symbolPrefix !== 'undefined' &&
        typeof symbolSuffix !== 'undefined'
      ) {
        isoCode = symbolSuffix
        symbolSuffix = null
      }
      const symbol =
        typeof symbolPrefix !== 'undefined' ? symbolPrefix : symbolSuffix
      if (typeof symbol === 'undefined' && typeof isoCode === 'undefined') {
        return match
      }
      const value = buildValue(v1, v2, v3)
      const currency =
        typeof isoCode !== 'undefined'
          ? isoCode
          : mapSymbolToIsoCode(symbol, locale)
      let result = formatCurrencyByLocale(value, locale, currency)
      result = result.replace(spaceRegex, ' ') // normalise space
      result = result.replace(dollarPrefixRegex, '') // strip the country prefix before `$`
      result = `${typeof minus !== 'undefined' ? MINUS : ''}${result}`
      if (isExplicit === true && symbol !== currency) {
        result = `${result} ${currency}` // append `currency` if is explicit format
      }
      return result
    })
  }
}

function buildValue (v1, v2, v3) {
  let integerPart
  let fractionalPart
  if (v2.length === 0) {
    integerPart = v1
    fractionalPart = v3
  } else {
    const m = v2.match(nonDigitRegex)
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
    `${integerPart.replace(nonDigitRegex, '')}${fractionalPart.replace(
      nonDigitRegex,
      '.'
    )}`
  )
}

function formatCurrencyByLocale (value, locale, currency) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    value
  )
}
