import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setHeight = {
  shorthand: 'h',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    return generateAutocompleteItems(Math.max(values[0], 0), function (value) {
      return {
        label: `Set height to ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  command: function (height) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(layer.width, height)
    }
    figma.notify(formatSuccessMessage(`Set height to ${height}`), {
      timeout: 300
    })
  }
}
