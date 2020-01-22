import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const offsetX = {
  shorthand: 'xx',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    if (values.length === 0) {
      return []
    }
    const isDisabled = selectedLayers.length === 0
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Offset X by ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (x) {
    for (const layer of figma.currentPage.selection) {
      layer.x += x
    }
    return { successMessage: `Offset X by ${x}` }
  }
}
