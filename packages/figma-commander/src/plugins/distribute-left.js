import { distributeLayersLeft } from 'figma-distribute-layers/src/distribute-layers-left/distribute-layers-left'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const distributeLeft = {
  shorthand: 'l',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    if (values.length === 0) {
      return [
        {
          label: 'Distribute layers left',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Distribute layers left with ${value} space`,
        isDisabled,
        value
      }
    })
  },
  command: function (space) {
    distributeLayersLeft(figma.currentPage.selection, space)
    return {
      successMessage: `Distributed layers left${
        space === 0 ? '' : ` with ${space} space`
      }`
    }
  }
}
