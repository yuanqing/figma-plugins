/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'
import { checkCommonParent } from './check-common-parent'
import { updateLayersSortOrder } from './update-layers-sort-order'

export function commandFactory ({ sortLayers, successMessage }) {
  return function () {
    const selectedLayers = figma.currentPage.selection
    if (selectedLayers.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    if (checkCommonParent(selectedLayers) === false) {
      figma.closePlugin(formatErrorMessage('Select layers in the same list'))
      return
    }
    const result = sortLayers(selectedLayers)
    updateLayersSortOrder(result)
    figma.closePlugin(formatSuccessMessage(successMessage))
  }
}
