/* global figma */
import {
  formatSuccessMessage,
  groupSiblingLayers
} from '@create-figma-plugin/utilities'
import { updateLayersSortOrder } from './update-layers-sort-order'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selection = figma.currentPage.selection
    const groups =
      selection.length === 1
        ? [selection[0].children]
        : groupSiblingLayers(selection)
    let didChange = false
    for (const layers of groups) {
      const result = sortLayers(layers)
      if (result !== null) {
        didChange = updateLayersSortOrder(result) || didChange
      }
    }
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(successMessage)
        : 'No change to sort order'
    )
  }
}
