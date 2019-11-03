import { isoCodes } from './iso-codes'
import { symbols } from './symbols'

export function isValidSymbol (symbol) {
  return symbols.indexOf(symbol) !== -1 || isoCodes.indexOf(symbol) !== -1
}
