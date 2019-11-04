import { DECIMAL_PLACES_INDEX } from '../data/constants'
import isoCodes from '../data/iso-codes'

export function mapIsoCodeToDecimalPlaces (isoCode) {
  return isoCodes[isoCode][DECIMAL_PLACES_INDEX]
}
