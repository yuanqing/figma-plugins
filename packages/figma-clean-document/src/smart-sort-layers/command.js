/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'
import { smartSortAllLayers } from './smart-sort-all-layers'
import { smartSortSelectedLayers } from './smart-sort-selected-layers'

export default function () {
  if (figma.currentPage.selection.length > 0) {
    if (smartSortSelectedLayers() === false) {
      figma.closePlugin(formatErrorMessage('Select layers in the same list'))
      return
    }
    figma.closePlugin(formatSuccessMessage('Smart sorted selected layers'))
    return
  }
  smartSortAllLayers()
  figma.closePlugin(formatSuccessMessage('Smart sorted layers on page'))
}
