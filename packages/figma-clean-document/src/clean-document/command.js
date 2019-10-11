/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUi,
  traverseLayer
} from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { deleteHiddenLayer } from '../delete-hidden-layers/delete-hidden-layer'
import { smartRenameLayer } from '../smart-rename-layers/smart-rename-layer'
import { defaultSettings } from '../default-settings'

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('CLEAN_DOCUMENT', async function (settings) {
    await saveSettings(settings)
    const {
      deleteHiddenLayers,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      smartSortLayers,
      sortPages
    } = settings
    const whitelistRegex =
      smartRenameLayersWhitelist !== ''
        ? new RegExp(smartRenameLayersWhitelist)
        : null
    if (sortPages) {
      const result = sortLayersByName(figma.root.children)
      updateLayersSortOrder(result)
    }
    for (const page of figma.root.children) {
      traverseLayer(page, function (layer) {
        if (layer.removed) {
          return
        }
        if (deleteHiddenLayers) {
          deleteHiddenLayer(layer)
        }
        if (smartRenameLayers) {
          smartRenameLayer(layer, whitelistRegex)
        }
      })
      if (smartSortLayers) {
        traverseLayer(
          page,
          function (layer) {
            const result = smartSortChildLayers(layer)
            if (result !== null) {
              updateLayersSortOrder(result)
            }
          },
          function (layer) {
            return layer.type !== 'INSTANCE'
          }
        )
      }
    }
    figma.closePlugin(formatSuccessMessage('Cleaned document'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 294, data: settings })
}
