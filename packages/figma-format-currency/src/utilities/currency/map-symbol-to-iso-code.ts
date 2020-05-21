import { SYMBOL_INDEX } from './data/constants'
import { isValidIsoCode } from './is-valid-iso-code'

const isoCodes = require('./data/iso-codes.json')

const dashRegex = /-/

export function mapSymbolToIsoCode(symbol: string, locale: string): string {
  const isoCodes = collectIsoCodes(symbol)
  if (isoCodes.length === 0) {
    if (isValidIsoCode(symbol)) {
      return symbol
    }
    return ''
  }
  if (isoCodes.length === 1) {
    return isoCodes[0]
  }
  const split = locale.split(dashRegex)
  const countryCode = split[split.length === 1 ? 0 : 1].toUpperCase()
  for (const isoCode of isoCodes) {
    if (isoCode.substring(0, 2) === countryCode) {
      return isoCode
    }
  }
  if (symbol === '£') {
    return 'GBP'
  }
  if (symbol === '¥') {
    return 'JPY'
  }
  if (symbol === '$') {
    return 'USD'
  }
  return isoCodes[0]
}

function collectIsoCodes(symbol: string): Array<string> {
  const result = []
  for (const isoCode of Object.keys(isoCodes)) {
    if (isoCodes[isoCode][SYMBOL_INDEX] === symbol) {
      result.push(isoCode)
    }
  }
  return result
}
