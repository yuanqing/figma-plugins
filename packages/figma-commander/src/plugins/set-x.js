import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setX = {
  shorthand: 'x',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length === 0
    if (values.length === 0) {
      return [
        {
          label: 'Set X to 0',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Set X to ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (x) {
    for (const layer of figma.currentPage.selection) {
      layer.x = x
    }
    return { successMessage: `Set X to ${x}` }
  }
}
