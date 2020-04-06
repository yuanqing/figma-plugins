import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  on,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { drawSliceOverSelection } from './utilities/draw-slice-over-selection'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  on('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { padding } = settings
    drawSliceOverSelection(padding)
    figma.closePlugin(formatSuccessMessage('Drew slice over selection'))
  })
  on('CLOSE_UI', function () {
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
