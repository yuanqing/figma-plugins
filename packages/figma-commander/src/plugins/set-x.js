import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setX = {
  shorthand: 'x',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Set X to ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  command: function (x) {
    for (const layer of figma.currentPage.selection) {
      layer.x = x
    }
    figma.notify(formatSuccessMessage(`Set X to ${x}`), {
      timeout: 300
    })
  }
}
