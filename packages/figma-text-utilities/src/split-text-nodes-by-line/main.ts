import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { splitTextNodesByLineAsync } from './utilities/split-text-nodes-by-line-async'

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
  const newSelection = await splitTextNodesByLineAsync(nodes)
  figma.currentPage.selection = newSelection
  figma.closePlugin(
    formatSuccessMessage(
      `Split ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
