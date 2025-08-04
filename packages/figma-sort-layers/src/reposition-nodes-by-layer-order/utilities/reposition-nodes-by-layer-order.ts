import {
  getAbsolutePosition,
  setAbsolutePosition
} from '@create-figma-plugin/utilities'

import { memoizedComputeBoundingBox } from '../../utilities/memoized-compute-bounding-box.js'

export function repositionNodesByLayerOrder(nodes: Array<SceneNode>): boolean {
  let didChange = false
  const normalizedNodePositions = computeNormalizedNodePositions(nodes)
  let i = 0
  while (i < nodes.length) {
    const { x, y } = getAbsolutePosition(nodes[i])
    const normalizedNodePosition = normalizedNodePositions[i]
    if (x !== normalizedNodePosition.x || y !== normalizedNodePosition.y) {
      didChange = true
      setAbsolutePosition(nodes[i], {
        x: normalizedNodePosition.x,
        y: normalizedNodePosition.y
      })
    }
    i += 1
  }
  return didChange
}

function computeNormalizedNodePositions(
  nodes: Array<SceneNode>
): Array<Vector> {
  return nodes
    .map(function (node: SceneNode) {
      const { x, y } = memoizedComputeBoundingBox(node)
      return { x, y }
    })
    .sort(function (a: Vector, b: Vector) {
      const yPositionDifference = a.y - b.y
      if (yPositionDifference !== 0) {
        return yPositionDifference
      }
      return a.x - b.x
    })
}
