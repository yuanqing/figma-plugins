import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers
} from '@create-figma-plugin/utilities'
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
    const scope =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    const notificationHandler = figma.notify(createLoadingMessage(scope), {
      timeout: 60000
    })
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
    notificationHandler.cancel()
    figma.closePlugin(
      `${
        count > 0
          ? formatSuccessMessage(createSuccessMessage(scope, count))
          : createFailureMessage(scope)
      }`
    )
  }
}
