import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const offsetY = {
  shorthand: 'yy',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Offset Y by ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  command: function (y) {
    for (const layer of figma.currentPage.selection) {
      layer.y += y
    }
    figma.notify(formatSuccessMessage(`Offset Y by ${y}`), {
      timeout: 300
    })
  }
}
