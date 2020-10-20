import { computeBoundingBox } from '@create-figma-plugin/utilities'
import mem from 'mem'

const memoized = mem(function (_: string, node: SceneNode) {
  return computeBoundingBox(node)
})

export function memoizedComputeBoundingBox(node: SceneNode): Rect {
  return memoized(node.id, node)
}
