/* global figma */
import {
  addEventListener,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'

export function commandFactory ({ direction, sortLayers, distributeLayers }) {
  return async function () {
    const layers = [].concat(figma.currentPage.selection)
    if (layers.length < 2) {
      figma.closePlugin('✘ \u00a0 Select two or more layers')
      return
    }
    const settings = (await loadSettings()) || {
      space: 0
    }
    addEventListener('DISTRIBUTE_LAYERS', async function (settings) {
      await saveSettings(settings)
      const { space } = settings
      layers.sort(sortLayers)
      distributeLayers(layers, space)
      figma.closePlugin(`✔ \u00a0 Distributed layers ${direction}`)
    })
    addEventListener('CLOSE', function () {
      figma.closePlugin()
    })
    showUi({ width: 240, height: 100, data: settings })
  }
}
