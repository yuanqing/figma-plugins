import { isoCodes } from './iso-codes'

export function isValidIsoCode (isoCode) {
  return isoCodes.indexOf(isoCode) !== -1
}
