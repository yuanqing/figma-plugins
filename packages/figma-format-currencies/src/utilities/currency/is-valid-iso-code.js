import isoCodes from './data/iso-codes'

export function isValidIsoCode (isoCode) {
  return typeof isoCodes[isoCode] !== 'undefined'
}
