import { traverseNode } from '@create-figma-plugin/utilities'

export function getImageNodes(): Array<RectangleNode> {
  const result: Array<RectangleNode> = []
  const nodes = figma.currentPage.selection.slice()
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (node.type !== 'RECTANGLE') {
        return
      }
      const fills = node.fills as Array<Paint>
      if (fills.length !== 1 || fills[0].type !== 'IMAGE') {
        return
      }
      result.push(node)
    })
  }
  return result
}
