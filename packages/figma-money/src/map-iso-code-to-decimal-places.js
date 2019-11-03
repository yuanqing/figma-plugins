import isoCodeToDecimalPlacesMap from './data/iso-code-to-decimal-places-map.json'

export function mapIsoCodeToDecimalPlaces (isoCode) {
  return isoCodeToDecimalPlacesMap[isoCode]
}
