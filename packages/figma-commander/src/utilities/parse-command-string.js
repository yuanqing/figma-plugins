import { plugins } from '../plugins/plugins'

export const shorthands = plugins
  .map(function ({ shorthand }) {
    return shorthand
  })
  .sort(function (a, b) {
    if (a.length !== b.length) {
      return b.length - a.length
    }
    return a.localeCompare(b)
  })

export function parseCommandString (commandString) {
  const trimmed = commandString.trim()
  if (trimmed !== '') {
    // exact match
    for (const shorthand of shorthands) {
      if (trimmed.indexOf(shorthand) === 0) {
        return { shorthand, values: extractValues(shorthand, commandString) }
      }
    }
    // partial match
    for (const shorthand of shorthands) {
      let i = -1
      while (++i < shorthand.length) {
        if (
          trimmed.indexOf(shorthand.substring(0, shorthand.length - i)) === 0
        ) {
          return { shorthand, values: extractValues(shorthand, commandString) }
        }
      }
    }
  }
  return {
    shorthand: null,
    values: []
  }
}

const whitespaceRegex = /\s+/

function extractValues (shorthand, commandString) {
  const values = commandString.substring(shorthand.length).trim()
  return values === '' ? [] : values.split(whitespaceRegex)
}
