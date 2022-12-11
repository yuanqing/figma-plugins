import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'

import { setFramePadding } from '../set-frame-padding/utilities/set-frame-padding.js'
import { PLUGIN_DATA_KEY } from '../utilities/constants.js'
import { Settings } from '../utilities/types.js'

export default async function (): Promise<void> {
  const nodes = figma.currentPage.selection.slice()
  let count = 0
  for (const node of nodes) {
    if (node.type !== 'COMPONENT' && node.type !== 'FRAME') {
      continue
    }
    if (updateFramePadding(node) === true) {
      count += 1
    }
  }
  if (count === 0) {
    figma.closePlugin(formatErrorMessage('No frames updated'))
    return
  }
  figma.closePlugin(
    formatSuccessMessage(
      count === 1
        ? 'Updated frame padding'
        : `Updated padding of ${count} frames`
    )
  )
}

function updateFramePadding(node: ComponentNode | FrameNode): boolean {
  const pluginData = node.getPluginData(PLUGIN_DATA_KEY)
  if (pluginData === '') {
    return false
  }
  const settings: Settings = JSON.parse(pluginData)
  return setFramePadding(node, settings)
}
