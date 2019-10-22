/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'
import { smartSortAllLayers } from './smart-sort-all-layers'
import { smartSortSelectedLayers } from './smart-sort-selected-layers'

export default function () {
  const notificationHandler = figma.notify('Sorting layers…', {
    timeout: 60000
  })
  if (figma.currentPage.selection.length > 0) {
    if (smartSortSelectedLayers() === false) {
      notificationHandler.cancel()
      figma.closePlugin(formatErrorMessage('Select layers in the same list'))
      return
    }
    notificationHandler.cancel()
    figma.closePlugin(formatSuccessMessage('Smart sorted selected layers'))
    return
  }
  smartSortAllLayers()
  notificationHandler.cancel()
  figma.closePlugin(formatSuccessMessage('Smart sorted layers on page'))
}
