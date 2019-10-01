/* global figma */

import { traverseNode } from '@create-figma-plugin/utilities'
import { smartRenameNode } from '../smart-rename-node'

export default function () {
  for (const page of figma.root.children) {
    traverseNode(page, function (node) {
      if (node.removed) {
        return
      }
      smartRenameNode(node)
    })
  }
  figma.closePlugin()
}
