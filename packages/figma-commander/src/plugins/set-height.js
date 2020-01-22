import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setHeight = {
  shorthand: 'h',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    if (values.length === 0) {
      return []
    }
    const isDisabled = selectedLayers.length === 0
    return generateAutocompleteItems(Math.max(values[0], 0), function (value) {
      return {
        label: `Set height to ${value}`,
        isDisabled,
        value
      }
    })
  },
  command: function (height) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(layer.width, height)
    }
    return { successMessage: `Set height to ${height}` }
  }
}
