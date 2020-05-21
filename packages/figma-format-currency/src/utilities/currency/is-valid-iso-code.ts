const isoCodes = require('./data/iso-codes.json')

export function isValidIsoCode(isoCode: string): boolean {
  return typeof isoCodes[isoCode] !== 'undefined'
}
