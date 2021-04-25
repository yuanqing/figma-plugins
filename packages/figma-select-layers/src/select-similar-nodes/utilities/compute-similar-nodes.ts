import { compareObjects, traverseNode } from '@create-figma-plugin/utilities'

export function computeSimilarNodes(
  referenceNode: SceneNode,
  nodeAttributeNames: Array<string>
): Array<SceneNode> {
  const result: Array<SceneNode> = []
  for (const node of figma.currentPage.children) {
    traverseNode(node, function (node: SceneNode) {
      if (
        compareNodeAttributes(nodeAttributeNames, referenceNode, node) === true
      ) {
        result.push(node)
      }
    })
  }
  return result
}

export function compareNodeAttributes(
  nodeAttributeNames: Array<string>,
  referenceNode: SceneNode,
  node: SceneNode
): boolean {
  for (const key of nodeAttributeNames) {
    if (
      compareObjects((referenceNode as any)[key], (node as any)[key]) === false
    ) {
      return false
    }
  }
  return true
}
