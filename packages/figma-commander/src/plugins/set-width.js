import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setWidth = {
  shorthand: 'w',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    if (values.length === 0) {
      return []
    }
    const isDisabled = selectedLayers.length === 0
    return generateAutocompleteItems(Math.max(values[0], 0), function (value) {
      return {
        label: `Set width to ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (width) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(width, layer.height)
    }
    return { successMessage: `Set width to ${width}` }
  }
}
