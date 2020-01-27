import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { cleanLayer } from './clean-layer'
import { defaultSettings } from '../utilities/default-settings'
import { getLayersInScope } from '../utilities/get-layers-in-scope'
import { smartSortLayers } from '../smart-sort-layers/smart-sort-layers'

const MAX_ITERATIONS = 10

export default async function () {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length !== 0
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    const scope = figma.currentPage.selection.length > 0 ? 'selection' : 'page'
    const notificationHandler = figma.notify(`Cleaning ${scope}…`, {
      timeout: 60000
    })
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      pixelPerfect,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers: smartSort,
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
      const groups = getLayersInScope()
      for (const layers of groups) {
        for (const layer of layers) {
          didChange =
            cleanLayer(layer, {
              deleteHiddenLayers,
              pixelPerfect,
              smartRenameLayers,
              smartRenameLayersWhitelistRegex,
              ungroupSingleLayerGroups
            }) || didChange
        }
      }
    }
    if (smartSort === true) {
      for (const layers of getLayersInScope()) {
        smartSortLayers(layers)
      }
    }
    notificationHandler.cancel()
    figma.closePlugin(formatSuccessMessage(`Cleaned ${scope}`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 384 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
