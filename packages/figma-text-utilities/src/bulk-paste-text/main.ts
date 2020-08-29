import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getTextNodes } from '../utilities/get-text-nodes'
import { bulkPasteText } from './utilities/bulk-paste-text'
import { readClipboardContents } from './utilities/read-clipboard-contents'

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
  const text = await readClipboardContents()
  await bulkPasteText(nodes, text)
  figma.closePlugin(
    formatSuccessMessage(
      `Pasted text in ${nodes.length} ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
