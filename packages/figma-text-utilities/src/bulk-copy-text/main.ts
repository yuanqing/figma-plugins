import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getTextNodes } from '../utilities/get-text-nodes'
import { removeConsecutiveNewlines } from '../utilities/remove-consecutive-newlines'
import { copyStringToClipboard } from './utilities/copy-string-to-clipboard'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const nodes = getTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  const string = removeConsecutiveNewlines(
    nodes
      .map(function (node: TextNode) {
        return node.characters
      })
      .join('\n')
  )
  if (string === '\n') {
    figma.closePlugin(formatErrorMessage('Nothing to copy'))
    return
  }
  await copyStringToClipboard(string)
  figma.closePlugin(
    formatSuccessMessage(
      `Copied ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
