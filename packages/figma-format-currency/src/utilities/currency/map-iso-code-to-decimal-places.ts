import { DECIMAL_PLACES_INDEX } from './data/constants'
const isoCodes = require('./data/iso-codes.json')

export function mapIsoCodeToDecimalPlaces(isoCode: string): number {
  return isoCodes[isoCode][DECIMAL_PLACES_INDEX]
}
