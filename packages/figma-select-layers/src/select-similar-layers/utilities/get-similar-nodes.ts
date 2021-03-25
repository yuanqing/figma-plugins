import { compareObjects, traverseNode } from '@create-figma-plugin/utilities'

export function getSimilarNodes(
  referenceNode: SceneNode,
  attributes: Array<string>
): Array<SceneNode> {
  const result: Array<SceneNode> = []
  for (const node of figma.currentPage.children) {
    traverseNode(node, function (node) {
      if (compareAttributes(attributes, referenceNode, node) === true) {
        result.push(node)
      }
    })
  }
  return result
}

export function compareAttributes(
  attributes: Array<string>,
  a: SceneNode,
  b: SceneNode
): boolean {
  for (const attribute of attributes) {
    if (compareObjects(a[attribute], b[attribute]) === false) {
      return false
    }
  }
  return true
}
