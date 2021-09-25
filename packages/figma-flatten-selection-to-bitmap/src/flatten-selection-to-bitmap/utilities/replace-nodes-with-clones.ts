import {
  getAbsolutePosition,
  traverseNode
} from '@create-figma-plugin/utilities'

export function replaceNodesWithClones(
  nodes: Array<SceneNode>
): Array<SceneNode> {
  return nodes.map(function (node) {
    if (
      containsComponentNode(node) === true ||
      isWithinInstanceNode(node) === true
    ) {
      if ('clone' in node) {
        const clone = node.clone()
        const { x, y } = getAbsolutePosition(node)
        clone.x = x
        clone.y = y
        node.visible = false
        return clone
      }
    }
    return node
  })
}

function containsComponentNode(node: SceneNode): boolean {
  let result = false
  traverseNode(
    node,
    function (childNode: SceneNode) {
      if (result === false && childNode.type === 'COMPONENT') {
        result = true
      }
    },
    function (childNode: SceneNode) {
      return (
        result === true ||
        childNode.type === 'COMPONENT' ||
        childNode.type === 'INSTANCE'
      )
    }
  )
  return result
}

function isWithinInstanceNode(node: SceneNode): boolean {
  const parentNode = node.parent
  if (
    parentNode === null ||
    parentNode.type === 'DOCUMENT' ||
    parentNode.type === 'PAGE'
  ) {
    return false
  }
  if (parentNode.type === 'INSTANCE') {
    return true
  }
  return isWithinInstanceNode(parentNode)
}
