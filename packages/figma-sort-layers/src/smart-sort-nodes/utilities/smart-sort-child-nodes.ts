import { SortNodes } from '../../utilities/types.js'
import { memoizedComputeBoundingBox } from './memoized-compute-bounding-box.js'

export function smartSortChildNodes(
  node: PageNode | SceneNode,
  ids: Array<string>
): ReturnType<SortNodes> {
  if ('children' in node) {
    const children = node.children
    if (children.length < 2 || node.type === 'INSTANCE') {
      return null
    }
    if ('numberOfFixedChildren' in node && node.numberOfFixedChildren > 0) {
      // `node.children` comprises `scrollingNodes` followed by `fixedNodes`
      const firstFixedChildNodeIndex =
        node.children.length - node.numberOfFixedChildren
      let i = -1
      const scrollingNodes = []
      const fixedNodes = []
      while (++i < children.length) {
        const childNode = children[i]
        if (ids.indexOf(childNode.id) !== -1) {
          if (i < firstFixedChildNodeIndex) {
            scrollingNodes.push(childNode)
          } else {
            fixedNodes.push(childNode)
          }
        }
      }
      return {
        fixedNodes: smartSortChildNodesHelper(fixedNodes),
        scrollingNodes: smartSortChildNodesHelper(scrollingNodes)
      }
    }
    const nodes = children
      .slice()
      .filter(function (layer: PageNode | SceneNode) {
        return ids.indexOf(layer.id) !== -1
      })
    return smartSortChildNodesHelper(nodes)
  }
  throw new Error('Node has no children')
}

function smartSortChildNodesHelper(nodes: Array<SceneNode>): Array<SceneNode> {
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

function checkIfLayersOverlap(a: SceneNode, b: SceneNode): boolean {
  const aa = memoizedComputeBoundingBox(a)
  const bb = memoizedComputeBoundingBox(b)
  return !(
    aa.x + aa.width <= bb.x ||
    aa.x >= bb.x + bb.width ||
    aa.y + aa.height <= bb.y ||
    aa.y >= bb.y + bb.height
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
