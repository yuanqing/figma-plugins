/* eslint-disable no-console */
import fs from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

type Result = Record<string, [string, number, number]>

function main() {
  const filePath = join(__dirname, 'data', 'exchange-rates.json')
  const exchangeRates = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const result = sortObjectByKey(parse(exchangeRates))
  console.log(
    `export const currencies: Record<${createRecordKeys(
      result
    )}, [string, number, number]> = ${JSON.stringify(result, null, 2)}`
  )
}
main()

function parse(exchangeRates: Record<string, number>): Result {
  const result: Result = {}
  for (const currencyCode of Object.keys(exchangeRates)) {
    const locale = currencyCode.substring(0, 2).toLowerCase()
    const symbol = parseSymbol(currencyCode, locale)
    const significantFigures = parseSignificantFigures(currencyCode, locale)
    const exchangeRate = exchangeRates[currencyCode]
    result[currencyCode] = [symbol, significantFigures, exchangeRate]
  }
  return result
}

function parseSymbol(currencyCode: string, locale: string) {
  const string = new Intl.NumberFormat(`en-${locale}`, {
    currency: currencyCode,
    currencyDisplay: 'symbol',
    maximumSignificantDigits: 1,
    style: 'currency'
  }).format(0)
  const symbolRegex = /([^0\s]*)\s?0\s?([^0\s]*)/
  const result = string.match(symbolRegex)
  if (result === null) {
    return currencyCode
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

function parseSignificantFigures(currencyCode: string, localeCode: string) {
  const string = new Intl.NumberFormat(`en-${localeCode}`, {
    currency: currencyCode,
    currencyDisplay: 'code',
    style: 'currency'
  }).format(123456789.123456789) // eslint-disable-line @typescript-eslint/no-loss-of-precision
  const currencyCodeRegex = /\s?[A-Z]{3}\s?/
  const value = string.replace(currencyCodeRegex, '')
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

function sortObjectByKey(object: Result): Result {
  const sortedKeys = Object.keys(object).sort()
  const result: Result = {}
  for (const key of sortedKeys) {
    result[key] = object[key]
  }
  return result
}

function createRecordKeys(object: Result): string {
  const result: Array<string> = []
  for (const key in object) {
    result.push(`'${key}'`)
  }
  return result.join('|')
}

export {} // needed to make this script compilable under `--isolatedModules`
