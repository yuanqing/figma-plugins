import { regexes } from '../regexes/regexes'

export function formatExplicit (string, isoCodes) {
  let result = string
  for (const regex of regexes) {
    result = result.replace(regex, function (match, p1, p2, p3) {
      if (p3 === isoCodes[p2]) {
        // already in explicit format
        return match
      }
      return `${p1} ${isoCodes[p2]}${typeof p3 !== 'undefined' ? ` ${p3}` : ''}`
    })
  }
  return result
}
