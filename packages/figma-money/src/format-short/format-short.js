import { regexes } from '../regexes/regexes'

export function formatShort (string, isoCodes) {
  let result = string
  for (const regex of regexes) {
    result = result.replace(regex, function (match, p1, p2, p3) {
      if (isoCodes[p2].indexOf(p3) === -1) {
        // the 3-letter all-caps string is not one of the known ISO codes
        return match
      }
      return p1
    })
  }
  return result
}
