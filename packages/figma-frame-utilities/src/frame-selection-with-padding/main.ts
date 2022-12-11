import {
  computeSiblingNodes,
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  isWithinInstanceNode,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
} from '@create-figma-plugin/utilities'

import { PLUGIN_DATA_KEY } from '../utilities/constants.js'
import { defaultSettings, settingsKey } from '../utilities/default-settings.js'
import {
  CloseUIHandler,
  FrameUtilitiesProps,
  SelectionChangedHandler,
  Settings
} from '../utilities/types.js'
import { frameSelectionWithPadding } from './utilities/frame-selection-with-padding.js'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const siblingNodes = computeSiblingNodes(figma.currentPage.selection.slice())
  if (siblingNodes.length > 1) {
    figma.closePlugin(
      formatErrorMessage('Select sibling layers at the same hierarchy')
    )
    return
  }
  const nodes = siblingNodes[0]
  if (isWithinInstanceNode(nodes[0]) === true) {
    figma.closePlugin(
      formatErrorMessage('Select layers outside instance layers')
    )
    return
  }
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  figma.on('selectionchange', function (): void {
    emit<SelectionChangedHandler>('SELECTION_CHANGED', hasSelection())
  })
  once('SUBMIT', async function (settings: Settings): Promise<void> {
    await saveSettingsAsync(settings, settingsKey)
    const frame = frameSelectionWithPadding(
      figma.currentPage.selection.slice(),
      settings
    )
    frame.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(settings))
    setRelaunchButton(frame, 'updateFramePadding')
    setRelaunchButton(frame, 'editFramePadding')
    figma.currentPage.selection = [frame]
    figma.closePlugin(formatSuccessMessage('Framed selected layers'))
  })
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI<FrameUtilitiesProps>(
    {
      height: 116,
      width: 240
    },
    { ...settings, hasSelection: true }
  )
}

function hasSelection(): boolean {
  const siblingNodes = computeSiblingNodes(figma.currentPage.selection.slice())
  if (siblingNodes.length > 1) {
    return false
  }
  const nodes = siblingNodes[0]
  if (isWithinInstanceNode(nodes[0]) === true) {
    return false
  }
  return true
}
