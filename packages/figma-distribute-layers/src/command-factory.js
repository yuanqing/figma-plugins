import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  saveSettings,
  triggerEvent,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from './default-settings'

export function commandFactory ({ direction, sortLayers, distributeLayers }) {
  return async function () {
    if (figma.currentPage.selection.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const settings = await loadSettings(defaultSettings)
    onSelectionChange(function (selectedLayers) {
      triggerEvent('SELECTION_CHANGED', {
        hasSelection: selectedLayers.length > 1
      })
    })
    addEventListener('SUBMIT', async function (settings) {
      await saveSettings(settings)
      const { space } = settings
      const layers = [].concat(figma.currentPage.selection)
      layers.sort(sortLayers)
      distributeLayers(layers, space)
      figma.closePlugin(formatSuccessMessage(`Distributed layers ${direction}`))
    })
    addEventListener('CLOSE', function () {
      figma.closePlugin()
    })
    showUI({ width: 240, height: 140 }, { ...settings, hasSelection: true })
  }
}
