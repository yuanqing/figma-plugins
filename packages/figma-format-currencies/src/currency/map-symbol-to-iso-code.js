import { SYMBOL_INDEX } from '../data/constants'
import isoCodes from '../data/iso-codes'

const dashRegex = /-/

export function mapSymbolToIsoCode (symbol, locale) {
  const isoCodes = collectIsoCodes(symbol)
  if (isoCodes.length === 0) {
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
  if (symbol === '$') {
    return 'USD'
  }
  if (symbol === '£') {
    return 'GBP'
  }
  return isoCodes[0]
}

function collectIsoCodes (symbol) {
  const result = []
  for (const isoCode of Object.keys(isoCodes)) {
    if (isoCodes[isoCode][SYMBOL_INDEX] === symbol) {
      result.push(isoCode)
    }
  }
  return result
}
