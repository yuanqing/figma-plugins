import { castValues } from './cast-values'
import { getPlugin } from './get-plugin'
import { parseCommandString } from './parse-command-string'

export function computeAutocompleteItems (commandString, state) {
  const { shorthand, values } = parseCommandString(commandString)
  if (shorthand === null) {
    return []
  }
  return getPlugin(shorthand).getAutocompleteItems(castValues(values), state)
}
