import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const offsetY = {
  shorthand: 'yy',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    if (values.length === 0) {
      return []
    }
    const isDisabled = selectedLayers.length === 0
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Offset Y by ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (y) {
    for (const layer of figma.currentPage.selection) {
      layer.y += y
    }
    return { successMessage: `Offset Y by ${y}` }
  }
}
