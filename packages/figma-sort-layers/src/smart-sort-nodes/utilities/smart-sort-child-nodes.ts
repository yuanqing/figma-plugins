import { memoizedComputeBoundingBox } from './memoized-compute-bounding-box'

export function smartSortChildNodes(
  node: PageNode | SceneNode,
  ids: Array<string>
): null | Array<SceneNode> {
  if ('children' in node) {
    const children = node.children
    if (children.length < 2 || node.type === 'INSTANCE') {
      return null
    }
    const nodes = children
      .slice()
      .filter(function (layer: PageNode | SceneNode) {
        return ids.indexOf(layer.id) !== -1
      })
    const [firstNode, ...rest] = nodes
    const result = [firstNode]
    for (const node of rest) {
      let i = 0
      let insertedChildNode = false
      while (i < result.length) {
        const resultNode = result[i]
        if (
          checkIfLayersOverlap(node, resultNode) === true ||
          compareLayerPosition(node, resultNode) === true
        ) {
          result.splice(i, 0, node)
          insertedChildNode = true
          break
        }
        i++
      }
      if (insertedChildNode === false) {
        result.splice(result.length, 0, node)
      }
    }
    return result.reverse()
  }
  throw new Error('Node has no parent')
}

function checkIfLayersOverlap(a: SceneNode, b: SceneNode): boolean {
  const aa = memoizedComputeBoundingBox(a)
  const bb = memoizedComputeBoundingBox(b)
  return !(
    aa.x + aa.width <= bb.x ||
    bb.x + bb.width <= aa.x ||
    aa.y + aa.height <= bb.y ||
    bb.y + bb.height <= aa.y
  )
}

function compareLayerPosition(a: SceneNode, b: SceneNode): boolean {
  // Returns `true` if `a` should be moved before `b` in the list
  const aa = memoizedComputeBoundingBox(a)
  const bb = memoizedComputeBoundingBox(b)
  const yPositionDifference = aa.y - bb.y
  if (yPositionDifference !== 0) {
    return yPositionDifference < 0
  }
  return aa.x - bb.x < 0
}
