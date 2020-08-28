import {
  sortNodesByCanonicalOrder,
  traverseNode
} from '@create-figma-plugin/utilities'

export function getTextNodes(): Array<TextNode> {
  const result: Array<TextNode> = []
  const nodes = sortNodesByCanonicalOrder(figma.currentPage.selection.slice())
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type === 'TEXT') {
        result.push(node)
      }
    })
  }
  return result as Array<TextNode>
}
