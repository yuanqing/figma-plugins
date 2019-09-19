import deleteHiddenNode from './delete-hidden-node'
import smartRenameNode from './smart-rename-node'
import smartSortChildNodes from './smart-sort-child-nodes'
import sortPages from './sort-pages'
import traverseNode from './traverse-node'

export default function (figma) {
  sortPages(figma.root)
  for (const page of figma.root.children) {
    traverseNode(page, function (node) {
      if (node.removed) {
        return
      }
      deleteHiddenNode(node)
      smartRenameNode(node)
      smartSortChildNodes(node)
    })
  }
  figma.closePlugin()
}
