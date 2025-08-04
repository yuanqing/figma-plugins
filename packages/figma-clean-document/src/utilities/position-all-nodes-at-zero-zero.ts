import { getAbsolutePosition } from '@create-figma-plugin/utilities'

export function positionAllNodesAtZeroZero(): boolean {
  const nodes = figma.currentPage.children.slice()
  if (nodes.length === 0) {
    return false
  }
  const { x, y } = computeOffset(nodes)
  if (x === 0 && y === 0) {
    return false
  }
  for (const node of nodes) {
    node.x -= x
    node.y -= y
  }
  return true
}

function computeOffset(nodes: Array<SceneNode>): Vector {
  let minX = Infinity
  let minY = Infinity
  for (const node of nodes) {
    const { x, y } = getAbsolutePosition(node)
    if (x < minX) {
      minX = x
    }
    if (y < minY) {
      minY = y
    }
  }
  return { x: minX, y: minY }
}
