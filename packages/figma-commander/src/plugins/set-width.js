import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

const shorthand = 'w'

export const setWidth = {
  shorthand,
  validate: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    const value = values[0]
    return generateAutocompleteItems(value, function (value) {
      return {
        shorthand,
        id: `setWidth-${value}`,
        label: `Set width to ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  implementation: function (width) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(width, layer.height)
    }
    figma.notify(formatSuccessMessage(`Set width to ${width}`))
  }
}
