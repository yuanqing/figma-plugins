import {
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  traverseNodeAsync
} from '@create-figma-plugin/utilities'

import { getScope } from '../utilities/get-scope.js'
import { showLoadingNotification } from '../utilities/show-loading-notification.js'

export function mainFactory(options: {
  processNodeAsync: (node: SceneNode) => Promise<boolean>
  stopTraversal: (node: SceneNode) => boolean
  createLoadingMessage: (scope: string) => string
  createSuccessMessage: (scope: string, count: number) => string
  createFailureMessage: (scope: string) => string
}): () => Promise<void> {
  const {
    processNodeAsync,
    stopTraversal,
    createLoadingMessage,
    createSuccessMessage,
    createFailureMessage
  } = options
  return async function (): Promise<void> {
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
      await traverseNodeAsync(
        node,
        async function (node: SceneNode) {
          if ((await processNodeAsync(node)) === true) {
            count++
          }
        },
        async function (node: SceneNode) {
          return stopTraversal(node)
        }
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
