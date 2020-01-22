import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setY = {
  shorthand: 'y',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length === 0
    if (values.length === 0) {
      return [
        {
          label: 'Set Y to 0',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Set Y to ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (y) {
    for (const layer of figma.currentPage.selection) {
      layer.y = y
    }
    return { successMessage: `Set Y to ${y}` }
  }
}
