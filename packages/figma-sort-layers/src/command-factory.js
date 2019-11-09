/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage,
  groupSiblingLayers
} from '@create-figma-plugin/utilities'
import { updateLayersSortOrder } from './update-layers-sort-order'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selection = figma.currentPage.selection
    const layer = selection[0]
    if (
      selection.length === 0 ||
      (selection.length === 1 &&
        layer.type !== 'BOOLEAN_OPERATION' &&
        layer.type !== 'FRAME' &&
        layer.type !== 'GROUP')
    ) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
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
