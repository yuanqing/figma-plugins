import {
  areSiblingNodes,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

export function createGroup(nodes: Array<SceneNode>): GroupNode {
  if (areSiblingNodes(nodes) === false) {
    return figma.group(nodes, figma.currentPage)
  }
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const topMostNode = sortNodesByCanonicalOrder(nodes)[0]
  const index = parent.children.indexOf(topMostNode)
  return figma.group(nodes, parent, index)
}
