import { traverseNode } from '@create-figma-plugin/utilities'

export function getSelectedTextNodes(): Array<TextNode> {
  const nodes = figma.currentPage.selection
  const result: Array<TextNode> = []
  for (const node of nodes) {
    traverseNode(node, function (childNode: SceneNode) {
      if (childNode.type !== 'TEXT') {
        return
      }
      result.push(childNode)
    })
  }
  return result
}
