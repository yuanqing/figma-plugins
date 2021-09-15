import { traverseNode } from '@create-figma-plugin/utilities'

import { TranslatableNode } from './types'

export function getSelectedTextNodes(): Array<TranslatableNode> {
  const nodes = figma.currentPage.selection
  const result: Array<TranslatableNode> = []
  for (const node of nodes) {
    traverseNode(node, function (childNode: SceneNode) {
      switch (childNode.type) {
        case 'CONNECTOR':
        case 'SHAPE_WITH_TEXT':
        case 'STICKY':
        case 'TEXT':
          result.push(childNode)
      }
    })
  }
  return result
}
