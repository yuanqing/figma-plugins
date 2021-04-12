/* eslint-disable no-console */

const exchangeRates = require('./data/exchange-rates') as {
  [key: string]: number
}

type Result = { [key: string]: [string, number, number] }

function main() {
  const isoCodes = sortObjectByKey(parse(exchangeRates))
  console.log(JSON.stringify(isoCodes, null, 2))
}
main()

function parse(exchangeRates: { [key: string]: number }) {
  const result: Result = {}
  for (const isoCode of Object.keys(exchangeRates)) {
    const locale = isoCode.substring(0, 2).toLowerCase()
    const symbol = parseSymbol(isoCode, locale)
    const significantFigures = parseSignificantFigures(isoCode, locale)
    const exchangeRate = exchangeRates[isoCode]
    result[isoCode] = [symbol, significantFigures, exchangeRate]
  }
  return result
}

function parseSymbol(isoCode: string, locale: string) {
  const string = new Intl.NumberFormat(`en-${locale}`, {
    currency: isoCode,
    currencyDisplay: 'symbol',
    maximumSignificantDigits: 1,
    style: 'currency'
  }).format(0)
  const symbolRegex = /([^0\s]*)\s?0\s?([^0\s]*)/
  const result = string.match(symbolRegex)
  if (result === null) {
    return isoCode
  }
  const symbol = result[1] !== '' ? result[1] : result[2]
  if (symbol[symbol.length - 1] === '$') {
    return '$'
  }
  if (symbol[symbol.length - 1] === '¥') {
    return '¥'
  }
  return symbol
}

function parseSignificantFigures(isoCode: string, locale: string) {
  const string = new Intl.NumberFormat(`en-${locale}`, {
    currency: isoCode,
    currencyDisplay: 'code',
    style: 'currency'
  }).format(123456789.123456789)
  const isoCodeRegex = /\s?[A-Z]{3}\s?/
  const value = string.replace(isoCodeRegex, '')
  const nonDigitRegex = /([^\d])/g
  const matches = value.match(nonDigitRegex)
  if (matches === null) {
    throw new Error('`matches` is null')
  }
  const thousandsSeparator = matches[0]
  const decimalSeparator = matches[matches.length - 1]
  if (thousandsSeparator === decimalSeparator) {
    return 0
  }
  const decimalIndex = value.lastIndexOf(decimalSeparator)
  return value.length - decimalIndex - 1
}

function sortObjectByKey(object: Result) {
  const sortedKeys = Object.keys(object).sort()
  const result: Result = {}
  for (const key of sortedKeys) {
    result[key] = object[key]
  }
  return result
}

export {}
