import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  on,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from './default-settings'

export function commandFactory (direction, distributeLayers) {
  return async function () {
    if (figma.currentPage.selection.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const settings = await loadSettings(defaultSettings)
    figma.on('selectionchange', function () {
      emit('SELECTION_CHANGED', {
        hasSelection: figma.currentPage.selection.length > 1
      })
    })
    on('SUBMIT', async function (settings) {
      await saveSettings(settings)
      const { space } = settings
      distributeLayers(figma.currentPage.selection, space)
      figma.closePlugin(formatSuccessMessage(`Distributed layers ${direction}`))
    })
    on('CLOSE_UI', function () {
      figma.closePlugin()
    })
    showUI({ width: 240, height: 140 }, { ...settings, hasSelection: true })
  }
}
