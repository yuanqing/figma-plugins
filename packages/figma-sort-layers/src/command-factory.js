/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'
import { groupSiblingLayers } from './group-sibling-layers'
import { updateLayersSortOrder } from './update-layers-sort-order'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selectedLayers = figma.currentPage.selection
    if (selectedLayers.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const groups = groupSiblingLayers(selectedLayers)
    for (const layers of groups) {
      const result = sortLayers(layers)
      if (result !== null) {
        updateLayersSortOrder(result)
      }
    }
    figma.closePlugin(formatSuccessMessage(successMessage))
  }
}
