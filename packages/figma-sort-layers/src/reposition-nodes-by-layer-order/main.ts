import {
  formatErrorMessage,
  formatSuccessMessage,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

import { computeNodeGroups } from '../utilities/compute-node-groups.js'
import { repositionNodesByLayerOrder } from './utilities/reposition-nodes-by-layer-order.js'

export default function (): void {
  const errorMessage = formatErrorMessage('Select two or more layers')
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
  let newSelection: Array<SceneNode> = []
  for (const nodes of groups) {
    const absolutePositionedNodes = sortNodesByCanonicalOrder(nodes).filter(
      function (node: SceneNode) {
        if (
          node.parent !== null &&
          'layoutMode' in node.parent &&
          node.parent.layoutMode !== 'NONE' &&
          'layoutPositioning' in node &&
          node.layoutPositioning === 'AUTO'
        ) {
          return false
        }
        return true
      }
    )
    newSelection = newSelection.concat(absolutePositionedNodes)
    didChange =
      didChange || repositionNodesByLayerOrder(absolutePositionedNodes)
  }
  if (didChange === true) {
    figma.currentPage.selection = newSelection
    figma.closePlugin(
      formatSuccessMessage('Repositioned selected layers by layer order')
    )
    return
  }
  figma.closePlugin('No change to layer positions')
}
