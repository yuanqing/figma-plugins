import {
  isWithinInstance,
  traverseNode,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'
import { smartSortChildNodes } from 'figma-sort-layers/src/smart-sort-nodes/utilities/smart-sort-child-nodes'

import { isNodeAnIllustration } from './is-node-an-illustration'

export function smartSortNodes(
  nodes: Array<SceneNode>,
  skipLockedLayers: boolean
): boolean {
  if (nodes.length < 2 || isWithinInstance(nodes[0]) === true) {
    return false
  }
  const parent = nodes[0].parent as PageNode | SceneNode
  if (hasAutoLayout(parent) === true) {
    return false
  }
  let didChange = false
  didChange = smartSortNodesHelper(parent, nodes) || didChange
  for (const node of nodes) {
    traverseNode(
      node,
      function (parent) {
        if (hasAutoLayout(parent) === true) {
          return
        }
        if (skipLockedLayers === true && parent.locked === true) {
          return
        }
        if ('children' in parent) {
          didChange =
            smartSortNodesHelper(parent, parent.children.slice()) || didChange
        }
      },
      function (node) {
        return node.type === 'INSTANCE' || isNodeAnIllustration(node) === true
      }
    )
  }
  return didChange
}

function smartSortNodesHelper(
  node: PageNode | SceneNode,
  nodes: Array<SceneNode>
): boolean {
  const ids = collectNodeIds(nodes)
  const result = smartSortChildNodes(node, ids)
  if (result === null) {
    return false
  }
  if (Array.isArray(result)) {
    return updateNodesSortOrder(result)
  }
  const sortFixedNodesResult = updateNodesSortOrder(result.fixedNodes)
  const sortScrollingNodesResult = updateNodesSortOrder(result.scrollingNodes)
  return sortFixedNodesResult || sortScrollingNodesResult
}

function collectNodeIds(nodes: Array<SceneNode>): Array<string> {
  const result = []
  for (const node of nodes) {
    result.push(node.id)
  }
  return result
}

function hasAutoLayout(node: PageNode | SceneNode): boolean {
  if (
    'layoutMode' in node &&
    (node.layoutMode === 'HORIZONTAL' || node.layoutMode === 'VERTICAL')
  ) {
    return true
  }
  return false
}
