/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  getAllOrSelectedLayers,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { cleanLayer } from './clean-layer'
import { smartSortAllLayers } from '../smart-sort-layers/smart-sort-all-layers'
import { smartSortSelectedLayers } from '../smart-sort-layers/smart-sort-selected-layers'
import { defaultSettings } from '../default-settings'

const MAX_ITERATIONS = 10

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('CLEAN_LAYERS', async function (settings) {
    const context =
      figma.currentPage.selection.length > 0 ? 'selection' : 'page'
    const notificationHandler = figma.notify(`Cleaning ${context}…`, {
      timeout: 60000
    })
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      pixelPerfect,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers,
      ungroupSingleLayerGroups
    } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist !== ''
        ? new RegExp(smartRenameLayersWhitelist)
        : null
    let didChange = true
    let iterations = 0
    while (didChange === true && iterations < MAX_ITERATIONS) {
      didChange = false
      iterations++
      const layers = getAllOrSelectedLayers()
      for (const layer of layers) {
        didChange =
          cleanLayer(layer, {
            deleteHiddenLayers,
            pixelPerfect,
            smartRenameLayers,
            smartRenameLayersWhitelistRegex,
            smartSortLayers,
            ungroupSingleLayerGroups
          }) || didChange
      }
      if (smartSortLayers === true) {
        if (figma.currentPage.selection.length > 0) {
          didChange = smartSortSelectedLayers() || didChange
        } else {
          didChange = smartSortAllLayers() || didChange
        }
      }
    }
    notificationHandler.cancel()
    figma.closePlugin(formatSuccessMessage(`Cleaned ${context}`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(240, 328, settings)
}
