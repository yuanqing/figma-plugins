import symbolToIsoCodeMap from './data/symbol-to-iso-codes-map.json'
import isoCodes from './data/iso-codes.json'

const symbols = Object.keys(symbolToIsoCodeMap)

export function isValidSymbol (symbol) {
  return symbols.indexOf(symbol) !== -1 || isoCodes.indexOf(symbol) !== -1
}
