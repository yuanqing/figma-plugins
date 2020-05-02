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

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const { padding } = settings
    const slice = drawSliceOverSelection(padding)
    figma.currentPage.selection = [slice]
    figma.closePlugin(formatSuccessMessage('Drew slice over selection'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    {
      width: 240,
      height: 140
    },
    { ...settings, hasSelection: true }
  )
}
