import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { generateAutocompleteItems } from '../utilities/generate-autocomplete-items'
import { NUMBER } from '../utilities/argument-types'

export const offsetX = {
  shorthand: 'xx',
  argumentTypes: [NUMBER],
  getAutocompleteItems: function (values, { hasSelection }) {
    if (values.length === 0) {
      return []
    }
    return generateAutocompleteItems(values[0], function (value) {
      return {
        label: `Offset X by ${value}`,
        isDisabled: hasSelection === false,
        value
      }
    })
  },
  command: function (x) {
    for (const layer of figma.currentPage.selection) {
      layer.x += x
    }
    figma.notify(formatSuccessMessage(`Offset X by ${x}`), {
      timeout: 300
    })
  }
}
