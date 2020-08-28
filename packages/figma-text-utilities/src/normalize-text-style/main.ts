import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getTextNodes } from '../utilities/get-text-nodes'
import { normalizeTextStyle } from './utilities/normalize-text-style'

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
  await normalizeTextStyle(nodes)
  figma.closePlugin(
    formatSuccessMessage(
      `Normalized text style of ${nodes.length} ${pluralize(
        nodes.length,
        'layer'
      )}`
    )
  )
}
