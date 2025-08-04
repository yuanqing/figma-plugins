import { computeBoundingBox } from '@create-figma-plugin/utilities'
import memoize from 'memoize'

const memoized = memoize(function (_: string, node: SceneNode) {
  return computeBoundingBox(node)
})

export function memoizedComputeBoundingBox(node: SceneNode): Rect {
  return memoized(node.id, node)
}
