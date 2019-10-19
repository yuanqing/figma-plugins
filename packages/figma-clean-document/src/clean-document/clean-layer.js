import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { deleteHiddenLayer } from '../delete-hidden-layers/delete-hidden-layer'
import { smartRenameLayer } from '../smart-rename-layers/smart-rename-layer'

export function cleanLayer (
  layer,
  {
    deleteHiddenLayers,
    smartRenameLayers,
    smartRenameLayersWhitelistRegex,
    smartSortLayers
  }
) {
  traverseLayer(layer, function (layer) {
    if (deleteHiddenLayers === true) {
      deleteHiddenLayer(layer)
    }
    if (layer.removed === true) {
      return
    }
    if (smartRenameLayers === true) {
      smartRenameLayer(layer, smartRenameLayersWhitelistRegex)
    }
  })
  if (smartSortLayers) {
    traverseLayer(
      layer,
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
