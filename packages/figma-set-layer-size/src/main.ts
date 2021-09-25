import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  MIXED_NUMBER,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { computeDimensions } from './utilities/compute-dimensions.js'
import { getValidSelectedNodes } from './utilities/get-valid-selected-nodes.js'
import { setNodesSize } from './utilities/set-nodes-size.js'
import { defaultSettings, settingsKey } from './utilities/settings.js'
import {
  CloseUIHandler,
  FormState,
  SelectionChangedHandler,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const nodes = getValidSelectedNodes()
  if (nodes.length === 0) {
    if (figma.currentPage.selection.length > 0) {
      figma.closePlugin(formatErrorMessage('Select layers outside instances'))
      return
    }
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function ({ width, height, resizeWithConstraints }: FormState) {
      await saveSettingsAsync({ resizeWithConstraints }, settingsKey)
      if (
        width === null ||
        width === MIXED_NUMBER ||
        height === null ||
        height === MIXED_NUMBER
      ) {
        figma.closePlugin()
        return
      }
      const nodes = getValidSelectedNodes()
      for (const node of nodes) {
        setNodesSize(node, { height, resizeWithConstraints, width })
      }
      figma.closePlugin(formatSuccessMessage('Set layer size'))
    }
  )
  figma.on('selectionchange', function () {
    const nodes = getValidSelectedNodes()
    emit<SelectionChangedHandler>('SELECTION_CHANGED', computeDimensions(nodes))
  })
  showUI<FormState>(
    { height: 141, width: 240 },
    { ...settings, ...computeDimensions(nodes) }
  )
}
