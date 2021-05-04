import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { drawSliceOverSelection } from './utilities/draw-slice-over-selection'
import { defaultSettings, settingsKey } from './utilities/settings'
import {
  CloseUIHandler,
  DrawSliceOverSelectionProps,
  SelectionChangedHandler,
  SubmitHandler
} from './utilities/types'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings, settingsKey)
    const { padding } = settings
    if (padding === null) {
      figma.closePlugin()
      return
    }
    const slice = drawSliceOverSelection(padding)
    figma.currentPage.selection = [slice]
    figma.closePlugin(formatSuccessMessage('Drew slice over selection'))
  })
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  showUI<DrawSliceOverSelectionProps>(
    {
      height: 136,
      width: 240
    },
    { ...settings, hasSelection: true }
  )
}
