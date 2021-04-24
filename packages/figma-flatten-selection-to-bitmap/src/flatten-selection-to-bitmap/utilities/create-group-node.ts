import {
  areSiblingNodes,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

export function createGroupNode(nodes: Array<SceneNode>): GroupNode {
  if (areSiblingNodes(nodes) === false) {
    return figma.group(nodes, figma.currentPage)
  }
  const parent = nodes[0].parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const sortedNodes = sortNodesByCanonicalOrder(nodes)
  const topMostNode = sortedNodes[sortedNodes.length - 1]
  const index = parent.children.indexOf(topMostNode)
  const groupNode = figma.group(nodes, parent, index)
  groupNode.name = nodes.length === 1 ? topMostNode.name : 'Group'
  return groupNode
}
