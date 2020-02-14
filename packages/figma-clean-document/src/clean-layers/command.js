import {
  addEventListener,
  collapseLayer,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettings,
  onSelectionChange,
  saveSettings,
  setRelaunchButton,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { cleanLayer } from '../utilities/clean-layer'
import { defaultSettings } from '../utilities/default-settings'
import { getSiblingLayerGroups } from '../utilities/get-sibling-layer-groups'
import { getScope } from '../utilities/get-scope'
import { showLoadingNotification } from '../utilities/show-loading-notification'
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
    const scope = getScope()
    const hideLoadingNotification = showLoadingNotification(
      `Cleaning layers ${scope}…`
    )
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
      didChange = collapseLayer(layer) || didChange
    }
    if (settings.smartSortLayers === true) {
      for (const layers of getSiblingLayerGroups()) {
        didChange = smartSortLayers(layers) || didChange
      }
    }
    hideLoadingNotification()
    setRelaunchButton(figma.currentPage, 'cleanLayers')
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(`Cleaned layers ${scope}`)
        : `No change to layers ${scope}`
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
