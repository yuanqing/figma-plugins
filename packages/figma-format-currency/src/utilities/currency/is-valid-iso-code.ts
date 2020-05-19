const isoCodes = require('./data/iso-codes.json')

export function isValidIsoCode(isoCode) {
  return typeof isoCodes[isoCode] !== 'undefined'
}
