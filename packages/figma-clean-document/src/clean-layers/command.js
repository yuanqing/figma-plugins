import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { cleanLayer } from '../utilities/clean-layer'
import { defaultSettings } from '../utilities/default-settings'
import { getLayersInScope } from '../utilities/get-layers-in-scope'
import { smartSortLayers } from '../utilities/smart-sort-layers'

export default async function () {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length > 0
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      pixelPerfect,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      ungroupSingleLayerGroups
    } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist === ''
        ? null
        : new RegExp(smartRenameLayersWhitelist)
    const scope = figma.currentPage.selection.length > 0 ? 'selection' : 'page'
    const notificationHandler = figma.notify(`Cleaning ${scope}…`, {
      timeout: 60000
    })
    let didChange = false
    for (const layer of getSelectedLayersOrAllLayers()) {
      didChange =
        cleanLayer(layer, {
          deleteHiddenLayers,
          pixelPerfect,
          smartRenameLayers,
          smartRenameLayersWhitelistRegex,
          ungroupSingleLayerGroups
        }) || didChange
    }
    if (settings.smartSortLayers === true) {
      for (const layers of getLayersInScope()) {
        didChange = smartSortLayers(layers) || didChange
      }
    }
    notificationHandler.cancel()
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(`Cleaned ${scope}`)
        : `No change to ${scope}`
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 384 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
