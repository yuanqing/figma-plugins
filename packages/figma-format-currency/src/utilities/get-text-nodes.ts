import {
  extractAttributes,
  sortNodesByName,
  traverseNode
} from '@create-figma-plugin/utilities'

import { TextNodeAttributes } from '../types'

export function getTextNodes(): Array<TextNodeAttributes> {
  const result: Array<SceneNode> = []
  for (const node of figma.currentPage.selection) {
    traverseNode(node, async function (node) {
      if (node.type === 'TEXT') {
        result.push(node)
      }
    })
  }
  return extractAttributes(sortNodesByName(result), [
    'id',
    'characters'
  ]) as Array<TextNodeAttributes>
}
