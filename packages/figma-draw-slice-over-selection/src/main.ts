import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from './utilities/default-settings'
import { drawSliceOverSelection } from './utilities/draw-slice-over-selection'
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
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  once<SubmitHandler>('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const { padding } = settings
    if (padding === null) {
      figma.closePlugin()
      return
    }
    const slice = drawSliceOverSelection(padding)
    figma.currentPage.selection = [slice]
    figma.closePlugin(formatSuccessMessage('Drew slice over selection'))
  })
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI<DrawSliceOverSelectionProps>(
    {
      height: 140,
      width: 240
    },
    { ...settings, hasSelection: true }
  )
}
