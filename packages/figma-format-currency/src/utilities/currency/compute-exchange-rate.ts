import { EXCHANGE_RATE_INDEX } from './data/constants'
const isoCodes = require('./data/iso-codes.json')

export function computeExchangeRate(sourceIsoCode, targetIsoCode) {
  const sourceToUSD = isoCodes[sourceIsoCode][EXCHANGE_RATE_INDEX]
  const targetToUSD = isoCodes[targetIsoCode][EXCHANGE_RATE_INDEX]
  return targetToUSD / sourceToUSD
}
