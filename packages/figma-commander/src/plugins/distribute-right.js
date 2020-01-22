import { distributeLayersRight } from 'figma-distribute-layers/src/distribute-layers-right/distribute-layers-right'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const distributeRight = {
  shorthand: 'r',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    if (values.length === 0) {
      return [
        {
          label: 'Distribute layers right',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Distribute layers right with ${value} space`,
        isDisabled,
        value
      }
    })
  },
  command: function (space) {
    distributeLayersRight(figma.currentPage.selection, space)
    return {
      successMessage: `Distributed layers right${
        space === 0 ? '' : ` with ${space} space`
      }`
    }
  }
}
