import {
  computeMaximumBounds,
  getAbsolutePosition,
  insertBeforeNode,
  setAbsolutePosition,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

export function frameSelectionWithPadding(
  nodes: Array<SceneNode>,
  padding: { horizontalPadding: null | number; verticalPadding: null | number }
): FrameNode {
  const horizontalPadding =
    padding.horizontalPadding === null ? 0 : padding.horizontalPadding
  const verticalPadding =
    padding.verticalPadding === null ? 0 : padding.verticalPadding
  const nodesInCanonicalOrder = sortNodesByCanonicalOrder(nodes)
  const topMostNode = nodesInCanonicalOrder[nodes.length - 1]
  const frame = figma.createFrame()
  insertBeforeNode(frame, topMostNode)
  frame.name = 'Frame'
  const maximumBounds = computeMaximumBounds(nodes)
  setAbsolutePosition(frame, {
    x: maximumBounds[0].x - horizontalPadding,
    y: maximumBounds[0].y - verticalPadding
  })
  const width = maximumBounds[1].x - maximumBounds[0].x + horizontalPadding * 2
  const height = maximumBounds[1].y - maximumBounds[0].y + verticalPadding * 2
  frame.resize(width, height)
  frame.fills = [{ color: { b: 1, g: 1, r: 1 }, type: 'SOLID' }]
  for (const node of nodes) {
    const { x, y } = getAbsolutePosition(node)
    frame.appendChild(node)
    setAbsolutePosition(node, {
      x,
      y
    })
  }
  return frame
}
