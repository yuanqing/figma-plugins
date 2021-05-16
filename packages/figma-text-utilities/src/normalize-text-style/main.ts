import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import { normalizeTextStyleAsync } from './utilities/normalize-text-style-async.js'

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
  await normalizeTextStyleAsync(nodes)
  figma.closePlugin(
    formatSuccessMessage(
      `Normalized text style of ${nodes.length} ${pluralize(
        nodes.length,
        'layer'
      )}`
    )
  )
}
