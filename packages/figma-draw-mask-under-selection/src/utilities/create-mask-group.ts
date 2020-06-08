import {
  computeMaximumBounds,
  insertAfterNode,
  setAbsolutePosition,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

export function createMaskGroup(nodes: Array<SceneNode>): RectangleNode {
  const nodesInCanonicalOrder = sortNodesByCanonicalOrder(nodes)
  const bottomMostNode = nodesInCanonicalOrder[0]
  const topMostNode = nodesInCanonicalOrder[nodes.length - 1]
  const mask = createMask(nodes, bottomMostNode)
  const parent = mask.parent
  if (parent === null) {
    throw new Error('Node has no parent')
  }
  const group = figma.group(
    [...nodes, mask],
    parent,
    parent.children.indexOf(topMostNode)
  )
  group.name = 'Mask Group'
  return mask
}

function createMask(
  nodes: Array<SceneNode>,
  bottomMostNode: SceneNode
): RectangleNode {
  const mask = figma.createRectangle()
  insertAfterNode(mask, bottomMostNode)
  mask.name = 'Mask'
  const maximumBounds = computeMaximumBounds(nodes)
  setAbsolutePosition(mask, {
    x: maximumBounds[0].x,
    y: maximumBounds[0].y
  })
  const width = maximumBounds[1].x - maximumBounds[0].x
  const height = maximumBounds[1].y - maximumBounds[0].y
  mask.resize(width, height)
  mask.isMask = true
  mask.fills = [{ color: { b: 1, g: 1, r: 1 }, type: 'SOLID' }]
  return mask
}
