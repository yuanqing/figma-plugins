import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

const shorthand = 'h'

export const setHeight = {
  shorthand,
  validate: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    const value = values[0]
    return generateAutocompleteItems(value, function (value) {
      return {
        shorthand,
        id: `setHeight-${value}`,
        label: `Set height to ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  implementation: function (height) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(layer.width, height)
    }
    figma.notify(formatSuccessMessage(`Set height to ${height}`))
  }
}
