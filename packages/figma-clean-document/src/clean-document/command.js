/* global figma */
import {
  addEventListener,
  loadSettings,
  saveSettings,
  showUi,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { deleteHiddenLayer } from '../delete-hidden-layers/delete-hidden-layer'
import { smartRenameLayer } from '../smart-rename-layers/smart-rename-layer'
import { smartSortChildLayers } from '../smart-sort-layers/smart-sort-child-layers'
import { defaultSettings } from '../default-settings'
import { sortLayersByName } from '../sort-layers-by-name'

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('CLEAN_DOCUMENT', async function (settings) {
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers
    } = settings
    const whitelistRegex =
      smartRenameLayersWhitelist !== ''
        ? new RegExp(smartRenameLayersWhitelist)
        : null
    sortLayersByName(figma.root.children)
    for (const page of figma.root.children) {
      traverseLayer(page, function (layer) {
        if (layer.removed) {
          return
        }
        if (deleteHiddenLayers) {
          deleteHiddenLayer(layer)
        }
        if (smartSortLayers) {
          smartSortChildLayers(layer)
        }
        if (smartRenameLayers) {
          smartRenameLayer(layer, whitelistRegex)
        }
      })
    }
    figma.closePlugin('✔ \u00a0 Cleaned document')
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 294, data: settings })
}
