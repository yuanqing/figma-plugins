import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  traverseNode
} from '@create-figma-plugin/utilities'
import { getScope } from '../utilities/get-scope'
import { showLoadingNotification } from '../utilities/show-loading-notification'

export function mainFactory ({
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
    const layers = getSelectedNodesOrAllNodes()
    const scope = getScope()
    const hideLoadingNotification = showLoadingNotification(
      createLoadingMessage(scope)
    )
    let count = 0
    for (const layer of layers) {
      traverseNode(
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
