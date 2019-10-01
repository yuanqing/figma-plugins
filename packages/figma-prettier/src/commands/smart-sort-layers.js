/* global figma */

import { traverseNode } from '@create-figma-plugin/utilities'
import { smartSortChildNodes } from '../smart-sort-child-nodes'

export default function () {
  for (const page of figma.root.children) {
    traverseNode(
      page,
      function (node) {
        if (node.removed) {
          return
        }
        smartSortChildNodes(node)
      },
      function (node) {
        return node.type !== 'INSTANCE'
      }
    )
  }
  figma.closePlugin()
}
