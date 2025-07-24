import {
  formatErrorMessage,
  formatSuccessMessage,
  pluralize
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import { removeWidowsAsync } from './utilities/remove-widows.js'

export default async function (): Promise<void> {
  const nodes = getSelectedTextNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No text layers in selection'))
    return
  }
  await removeWidowsAsync(nodes)
  figma.closePlugin(
    formatSuccessMessage(
      `Removed widows in ${pluralize(nodes.length, 'text layer')}`
    )
  )
}
