import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { computeDimensions } from './utilities/compute-dimensions'
import { defaultSettings } from './utilities/default-settings'
import { getSelectedNodesAttributes } from './utilities/get-selected-nodes-attributes'
import { setSize } from './utilities/set-size'
import { updateSelection } from './utilities/update-selection'

export default async function (): Promise<void> {
  const nodes = getSelectedNodesAttributes()
  if (nodes.length === 0) {
    if (figma.currentPage.selection.length > 0) {
      figma.closePlugin(formatErrorMessage('Select layers outside instances'))
      return
    }
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    const nodes = getSelectedNodesAttributes()
    emit('SELECTION_CHANGED', {
      nodes,
      ...computeDimensions(nodes)
    })
  })
  once('SUBMIT', async function (settings) {
    const { nodes, width, height, resizeWithConstraints } = settings
    await saveSettingsAsync({ resizeWithConstraints })
    setSize(nodes, width, height, resizeWithConstraints)
    updateSelection(nodes)
    figma.closePlugin(formatSuccessMessage('Set layer size'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 140 },
    { ...settings, nodes, ...computeDimensions(nodes) }
  )
}
