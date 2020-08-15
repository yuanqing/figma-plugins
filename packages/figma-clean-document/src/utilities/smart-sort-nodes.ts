import {
  compareObjects,
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
  const ids = collectNodeIds(nodes)
  const result = smartSortChildNodes(parent, ids)
  if (
    result !== null &&
    compareObjects(ids, collectNodeIds(result)) === false
  ) {
    updateNodesSortOrder(result)
    didChange = true
  }
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
          const nodes = parent.children
          const ids = collectNodeIds(nodes.slice())
          const result = smartSortChildNodes(parent, ids)
          if (
            result !== null &&
            compareObjects(ids, collectNodeIds(result)) === false
          ) {
            updateNodesSortOrder(result)
            didChange = true
          }
        }
      },
      function (node) {
        return node.type === 'INSTANCE' || isNodeAnIllustration(node) === true
      }
    )
  }
  return didChange
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
