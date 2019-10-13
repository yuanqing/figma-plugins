/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { cleanLayer } from './clean-layer'
import { DOCUMENT, PAGE, SELECTION } from './scope'
import { defaultSettings } from '../default-settings'

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  const hasSelection = figma.currentPage.selection.length !== 0
  if (hasSelection) {
    settings.scope = SELECTION
  } else {
    if (settings.scope === SELECTION) {
      settings.scope = DOCUMENT
    }
  }
  addEventListener('CLEAN_DOCUMENT', async function (settings) {
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      scope,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers,
      sortPages
    } = settings
    const layers = getLayersInScope(scope)
    if (scope === SELECTION && layers.length === 0) {
      figma.closePlugin(formatErrorMessage('Select one or more layers'))
      return
    }
    for (const layer of layers) {
      cleanLayer(layer, {
        deleteHiddenLayers,
        smartRenameLayers,
        smartRenameLayersWhitelist,
        smartSortLayers
      })
    }
    if (scope === DOCUMENT && sortPages === true) {
      const result = sortLayersByName(figma.root.children)
      updateLayersSortOrder(result)
    }
    figma.closePlugin(formatSuccessMessage(`Cleaned ${scope}`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 400, data: settings })
}

function getLayersInScope (scope) {
  if (scope === DOCUMENT) {
    return figma.root.children
  }
  if (scope === PAGE) {
    return [figma.currentPage]
  }
  return figma.currentPage.selection
}
