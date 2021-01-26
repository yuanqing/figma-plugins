import { traverseNode } from '@create-figma-plugin/utilities'

export function getImageNodes(): Array<RectangleNode> {
  const result: Array<RectangleNode> = []
  const nodes = figma.currentPage.selection.slice()
  for (const node of nodes) {
    traverseNode(node, function (node: SceneNode) {
      if (
        node.type !== 'RECTANGLE' ||
        (node.fills as Array<Paint>).length === 0
      ) {
        return
      }
      const imagePaintFills = (node.fills as Array<Paint>).filter(function (
        paint: Paint
      ) {
        return paint.type === 'IMAGE'
      })
      if (imagePaintFills.length === 0) {
        return
      }
      result.push(node)
    })
  }
  return result
}
