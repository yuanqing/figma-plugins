import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize,
  sortNodesByCanonicalOrder
} from '@create-figma-plugin/utilities'

import { bulkCopyText } from './utilities/bulk-copy-text'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const nodes = figma.currentPage.selection.filter(function (node) {
    return node.type === 'TEXT'
  }) as Array<TextNode>
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  const sortedNodes = sortNodesByCanonicalOrder(nodes).reverse() as Array<
    TextNode
  >
  await bulkCopyText(sortedNodes)
  figma.closePlugin(
    formatSuccessMessage(
      `Copied ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
