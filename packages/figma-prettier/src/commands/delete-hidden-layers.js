/* global figma */

import { traverseNode } from '@create-figma-plugin/utilities'
import { deleteHiddenNode } from '../delete-hidden-node'

export default function () {
  for (const page of figma.root.children) {
    traverseNode(page, function (node) {
      if (node.removed) {
        return
      }
      deleteHiddenNode(node)
    })
  }
  figma.closePlugin()
}
