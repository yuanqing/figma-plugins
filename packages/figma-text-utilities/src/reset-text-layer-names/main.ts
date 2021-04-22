import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const nodes = getSelectedTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  for (const node of nodes) {
    node.autoRename = true
  }
  figma.closePlugin(
    formatSuccessMessage(
      `Reset ${nodes.length} text layer ${pluralize(nodes.length, 'name')}`
    )
  )
}
