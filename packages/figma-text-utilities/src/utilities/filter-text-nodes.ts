import { traverseNode } from '@create-figma-plugin/utilities'

export function filterTextNodes(nodes: Array<SceneNode>): Array<TextNode> {
  const result: Array<TextNode> = []
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type === 'TEXT') {
        result.push(node)
      }
    })
  }
  return result
}
