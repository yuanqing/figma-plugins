import { distributeLayersUp } from 'figma-distribute-layers/src/distribute-layers-up/distribute-layers-up'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const distributeTop = {
  shorthand: 't',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { selectedLayers }) {
    const isDisabled = selectedLayers.length < 2
    if (values.length === 0) {
      return [
        {
          label: 'Distribute layers top',
          isDisabled,
          value: 0
        }
      ]
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Distribute layers top with ${value} space`,
        isDisabled,
        value
      }
    })
  },
  command: function (space) {
    distributeLayersUp(figma.currentPage.selection, space)
    return {
      successMessage: `Distributed layers top${
        space === 0 ? '' : ` with ${space} space`
      }`
    }
  }
}
