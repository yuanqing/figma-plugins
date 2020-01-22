import { distributeLayersDown } from 'figma-distribute-layers/src/distribute-layers-down/distribute-layers-down'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const distributeBottom = {
  shorthand: 'b',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    if (values.length === 0) {
      return [
        {
          label: 'Distribute layers bottom',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Distribute layers bottom with ${value} space`,
        isDisabled,
        value
      }
    })
  },
  command: function (space) {
    distributeLayersDown(figma.currentPage.selection, space)
    return {
      successMessage: `Distributed layers bottom${
        space === 0 ? '' : ` with ${space} space`
      }`
    }
  }
}
