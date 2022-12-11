import {
  computeMaximumBounds,
  getAbsolutePosition
} from '@create-figma-plugin/utilities'

export function setFramePadding(
  node: FrameNode | ComponentNode,
  padding: { horizontalPadding: null | number; verticalPadding: null | number }
): boolean {
  if (node.children.length === 0) {
    return false
  }
  const { horizontalPadding, verticalPadding } = padding
  const maximumBounds = computeMaximumBounds(node.children.slice())
  const { x, y } = getAbsolutePosition(node)
  const horizontalOffset =
    horizontalPadding === null
      ? null
      : horizontalPadding - (maximumBounds[0].x - x)
  const verticalOffset =
    verticalPadding === null ? null : verticalPadding - (maximumBounds[0].y - y)
  for (const childNode of node.children) {
    if (horizontalOffset !== null) {
      childNode.x += horizontalOffset
    }
    if (verticalOffset !== null) {
      childNode.y += verticalOffset
    }
  }
  const width =
    horizontalPadding === null
      ? null
      : maximumBounds[1].x - maximumBounds[0].x + 2 * horizontalPadding
  const height =
    verticalPadding === null
      ? null
      : maximumBounds[1].y - maximumBounds[0].y + 2 * verticalPadding
  node.resize(
    width === null ? node.width : width,
    height === null ? node.height : height
  )
  return true
}
