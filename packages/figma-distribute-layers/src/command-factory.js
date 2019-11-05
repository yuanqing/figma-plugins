/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import defaultSettings from './default-settings'

export function commandFactory ({ direction, sortLayers, distributeLayers }) {
  return async function () {
    const layers = [].concat(figma.currentPage.selection)
    if (layers.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const settings = await loadSettings(defaultSettings)
    addEventListener('DISTRIBUTE_LAYERS', async function (settings) {
      await saveSettings(settings)
      const { space } = settings
      layers.sort(sortLayers)
      distributeLayers(layers, space)
      figma.closePlugin(formatSuccessMessage(`Distributed layers ${direction}`))
    })
    addEventListener('CLOSE', function () {
      figma.closePlugin()
    })
    showUI({ width: 240, height: 100 }, settings)
  }
}
