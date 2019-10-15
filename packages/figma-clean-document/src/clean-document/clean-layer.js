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
    smartRenameLayersWhitelist,
    smartSortLayers
  }
) {
  traverseLayer(layer, function (layer) {
    if (layer.removed === true) {
      return
    }
    if (deleteHiddenLayers === true) {
      deleteHiddenLayer(layer)
    }
    if (smartRenameLayers === true) {
      smartRenameLayer(layer, smartRenameLayersWhitelist)
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
