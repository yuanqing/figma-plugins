import {
  formatErrorMessage,
  formatSuccessMessage,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { computeNodeGroups } from './compute-node-groups.js'
import { MainFactoryOptions } from './types.js'

export function mainFactory({
  sortNodes,
  successMessage
}: MainFactoryOptions): () => void {
  const errorMessage = formatErrorMessage('Select two or more layers')
  return function (): void {
    if (figma.currentPage.selection.length === 0) {
      figma.closePlugin(errorMessage)
      return
    }
    const groups = computeNodeGroups()
    if (groups === null) {
      figma.closePlugin(errorMessage)
      return
    }
    let didChange = false
    for (const nodes of groups) {
      const parentNode = nodes[0].parent
      if (parentNode === null) {
        throw new Error('`parentNode` is `null`')
      }
      const result = sortNodes(
        'layoutMode' in parentNode && parentNode.layoutMode !== 'NONE'
          ? nodes.slice().reverse()
          : nodes
      )
      if (result === null) {
        continue
      }
      if (Array.isArray(result)) {
        didChange = updateNodesSortOrder(result) || didChange
        continue
      }
      const sortFixedNodesResult =
        result.fixedNodes.length === 0
          ? false
          : updateNodesSortOrder(result.fixedNodes)
      if ('numberOfFixedChildren' in parentNode) {
        parentNode.numberOfFixedChildren = result.fixedNodes.length
      }
      const sortScrollingNodesResult =
        result.scrollingNodes.length === 0
          ? false
          : updateNodesSortOrder(result.scrollingNodes)
      didChange = sortFixedNodesResult || sortScrollingNodesResult
    }
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(successMessage)
        : 'No change to sort order'
    )
  }
}
