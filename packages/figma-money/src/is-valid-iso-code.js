import isoCodes from './data/iso-codes'

export function isValidIsoCode (isoCode) {
  return isoCodes.indexOf(isoCode) !== -1
}
