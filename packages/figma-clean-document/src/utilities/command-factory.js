import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers
} from '@create-figma-plugin/utilities'
import { getScope } from '../utilities/get-scope'
import { showLoadingNotification } from '../utilities/show-loading-notification'
import { traverseLayerDepthFirst } from './traverse-layer-depth-first'

export function commandFactory ({
  processLayer,
  stopTraversal,
  createLoadingMessage,
  createSuccessMessage,
  createFailureMessage
}) {
  return function () {
    if (figma.currentPage.children.length === 0) {
      figma.closePlugin(formatErrorMessage('No layers on page'))
      return
    }
    const layers = getSelectedLayersOrAllLayers()
    const scope = getScope()
    const hideLoadingNotification = showLoadingNotification(
      createLoadingMessage(scope)
    )
    let count = 0
    for (const layer of layers) {
      traverseLayerDepthFirst(
        layer,
        function (layer) {
          if (processLayer(layer) === true) {
            count++
          }
        },
        stopTraversal
      )
    }
    hideLoadingNotification()
    figma.closePlugin(
      `${
        count > 0
          ? formatSuccessMessage(createSuccessMessage(scope, count))
          : createFailureMessage(scope)
      }`
    )
  }
}
