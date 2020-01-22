import { castValues } from './cast-values'
import { getPlugin } from './get-plugin'
import { parseCommandString } from './parse-command-string'

export function computeAutocompleteItems (commandString, state) {
  const { shorthand, values } = parseCommandString(commandString)
  if (shorthand === null) {
    return []
  }
  const plugin = getPlugin(shorthand)
  return plugin
    .getAutocompleteItems(castValues(values, plugin.argumentTypes), state)
    .map(function (autocompleteItem) {
      return {
        ...autocompleteItem,
        id: `${shorthand}-${autocompleteItem.value}`,
        shorthand
      }
    })
}
