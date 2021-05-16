import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import { copyStringToClipboardAsync } from './utilities/copy-string-to-clipboard-async.js'

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
  const string = nodes
    .map(function (node: TextNode) {
      return node.characters
    })
    .join('\n')
  if (string === '\n') {
    figma.closePlugin(formatErrorMessage('Nothing to copy'))
    return
  }
  await copyStringToClipboardAsync(string)
  figma.closePlugin(
    formatSuccessMessage(
      `Copied ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
