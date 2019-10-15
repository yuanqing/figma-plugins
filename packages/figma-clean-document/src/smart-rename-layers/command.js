/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  getAllOrSelectedLayers,
  loadSettings,
  mapNumberToWord,
  pluralize,
  saveSettings,
  showUi,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { smartRenameLayer } from './smart-rename-layer'

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('SMART_RENAME_LAYERS', async function (settings) {
    await saveSettings(settings)
    const { smartRenameLayersWhitelist } = settings
    let count = 0
    const layers = getAllOrSelectedLayers()
    for (const layer of layers) {
      traverseLayer(layer, function (layer) {
        if (layer.removed === true) {
          return
        }
        if (smartRenameLayer(layer, smartRenameLayersWhitelist)) {
          count++
        }
      })
    }
    const context =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    /* eslint-disable indent */
    figma.closePlugin(
      count === 0
        ? `No layers renamed ${context}`
        : formatSuccessMessage(
            `Smart renamed ${mapNumberToWord(count)} ${pluralize(
              count,
              'layer'
            )} ${context}`
          )
    )
    /* eslint-enable indent */
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 108, data: settings })
}
