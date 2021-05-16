import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  traverseNode
} from '@create-figma-plugin/utilities'

import { getScope } from '../utilities/get-scope.js'
import { showLoadingNotification } from '../utilities/show-loading-notification.js'

export function mainFactory(options: {
  processNode: (node: SceneNode) => boolean
  stopTraversal: (node: SceneNode) => boolean
  createLoadingMessage: (scope: string) => string
  createSuccessMessage: (scope: string, count: number) => string
  createFailureMessage: (scope: string) => string
}): () => void {
  const {
    processNode,
    stopTraversal,
    createLoadingMessage,
    createSuccessMessage,
    createFailureMessage
  } = options
  return function (): void {
    if (figma.currentPage.children.length === 0) {
      figma.closePlugin(formatErrorMessage('No layers on page'))
      return
    }
    const nodes = getSelectedNodesOrAllNodes()
    const scope = getScope()
    const hideLoadingNotification = showLoadingNotification(
      createLoadingMessage(scope)
    )
    let count = 0
    for (const node of nodes) {
      traverseNode(
        node,
        function (node) {
          if (processNode(node) === true) {
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
