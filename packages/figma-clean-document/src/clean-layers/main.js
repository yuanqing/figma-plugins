import {
  emit,
  collapseLayer,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettingsAsync,
  on,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
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
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  on('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const {
      deleteHiddenLayers,
      pixelPerfect,
      skipLockedLayers,
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
          skipLockedLayers,
          smartRenameLayers,
          smartRenameLayersWhitelistRegex,
          ungroupSingleLayerGroups
        }) || didChange
      collapseLayer(layer)
    }
    if (settings.smartSortLayers === true) {
      for (const layers of getSiblingLayerGroups()) {
        didChange = smartSortLayers(layers, skipLockedLayers) || didChange
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
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 416 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
