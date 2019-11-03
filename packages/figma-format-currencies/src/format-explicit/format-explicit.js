import { formatFactory } from '../factory/format-factory'

export const formatExplicit = formatFactory(function (result, { isoCode }) {
  if (result.indexOf(isoCode) === -1) {
    return `${result} ${isoCode}`
  }
  return result
})
