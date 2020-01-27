import {
  addEventListener,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettings,
  mapNumberToWord,
  pluralize,
  saveSettings,
  showUI,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { smartRenameLayer } from './smart-rename-layer'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function (settings) {
    const notificationHandler = figma.notify('Renaming layers…', {
      timeout: 60000
    })
    await saveSettings(settings)
    const { smartRenameLayersWhitelist } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist !== ''
        ? new RegExp(smartRenameLayersWhitelist)
        : null
    let count = 0
    const layers = getSelectedLayersOrAllLayers()
    for (const layer of layers) {
      traverseLayer(layer, function (layer) {
        if (smartRenameLayer(layer, smartRenameLayersWhitelistRegex) === true) {
          count++
        }
      })
    }
    const scope =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    notificationHandler.cancel()
    figma.closePlugin(
      count === 0
        ? `No layers renamed ${scope}`
        : formatSuccessMessage(
            `Smart renamed ${mapNumberToWord(count)} ${pluralize(
              count,
              'layer'
            )} ${scope}`
          )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 140 }, settings)
}
