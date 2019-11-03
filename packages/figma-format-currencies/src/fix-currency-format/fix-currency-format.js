import { formatFactory } from '../factory/format-factory'

export const fixCurrencyFormat = formatFactory(function (
  result,
  isoCode,
  isExplicitFormat
) {
  if (isExplicitFormat === true) {
    if (result.indexOf(isoCode) === -1) {
      return `${result} ${isoCode}`
    }
  }
  return result
})
