import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes'
import { readClipboardContents } from './utilities/read-clipboard-contents'
import { setText } from './utilities/set-text'

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
  const string = await readClipboardContents()
  if (string === '\n') {
    figma.closePlugin(formatErrorMessage('Nothing to paste'))
    return
  }
  await setText(nodes, string)
  figma.closePlugin(
    formatSuccessMessage(
      `Pasted text in ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
