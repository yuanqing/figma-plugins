import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const setWidth = {
  shorthand: 'w',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    return generateAutocompleteItems(Math.max(values[0], 0), function (value) {
      return {
        label: `Set width to ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  command: function (width) {
    for (const layer of figma.currentPage.selection) {
      layer.resize(width, layer.height)
    }
    figma.notify(formatSuccessMessage(`Set width to ${width}`), {
      timeout: 300
    })
  }
}
