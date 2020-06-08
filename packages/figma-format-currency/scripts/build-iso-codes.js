const { join } = require('path')
const { outputJson } = require('fs-extra')
const exchangeRates = require('./data/exchange-rates')

async function main() {
  const isoCodes = sortObjectByKey(parse(exchangeRates))
  const filePath = join(
    __dirname,
    '..',
    'src',
    'utilities',
    'currency',
    'data',
    'iso-codes.json'
  )
  await outputJson(filePath, isoCodes, { spaces: 2 })
}
main()

function parse(exchangeRates) {
  const result = {}
  for (const isoCode of Object.keys(exchangeRates)) {
    const locale = isoCode.substring(0, 2).toLowerCase()
    const symbol = parseSymbol(isoCode, locale)
    const significantFigures = parseSignificantFigures(isoCode, locale)
    const exchangeRate = exchangeRates[isoCode]
    result[isoCode] = [symbol, significantFigures, exchangeRate]
  }
  return result
}

function parseSymbol(isoCode, locale) {
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

function parseSignificantFigures(isoCode, locale) {
  const string = new Intl.NumberFormat(`en-${locale}`, {
    currency: isoCode,
    currencyDisplay: 'code',
    style: 'currency'
  }).format(123456789.123456789)
  const isoCodeRegex = /\s?[A-Z]{3}\s?/
  const value = string.replace(isoCodeRegex, '')
  const nonDigitRegex = /([^\d])/g
  const matches = value.match(nonDigitRegex)
  const thousandsSeparator = matches[0]
  const decimalSeparator = matches[matches.length - 1]
  if (thousandsSeparator === decimalSeparator) {
    return 0
  }
  const decimalIndex = value.lastIndexOf(decimalSeparator)
  return value.length - decimalIndex - 1
}

function sortObjectByKey(object) {
  const sortedKeys = Object.keys(object).sort()
  const result = {}
  for (const key of sortedKeys) {
    result[key] = object[key]
  }
  return result
}
