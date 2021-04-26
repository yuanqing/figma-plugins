import {
  getAbsolutePosition,
  isWithinInstanceNode
} from '@create-figma-plugin/utilities'

export function replaceNodesWithinInstancesWithClones(
  nodes: Array<SceneNode>
): Array<SceneNode> {
  return nodes.map(function (node) {
    if (isWithinInstanceNode(node) === true) {
      const clone = node.clone()
      const { x, y } = getAbsolutePosition(node)
      clone.x = x
      clone.y = y
      node.visible = false
      return clone
    }
    return node
  })
}
