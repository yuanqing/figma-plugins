import deleteHiddenNode from './delete-hidden-node'
import smartRenameNode from './smart-rename-node'
import smartSortChildNodes from './smart-sort-child-nodes'
import traverseNode from './traverse-node'

export default function (node) {
  traverseNode(node, function (childNode) {
    if (childNode.removed) {
      return
    }
    deleteHiddenNode(childNode)
    smartRenameNode(childNode)
    smartSortChildNodes(childNode)
  })
}
