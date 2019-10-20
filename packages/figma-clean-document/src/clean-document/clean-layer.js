import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { deleteHiddenLayer } from '../delete-hidden-layers/delete-hidden-layer'
import { makePixelPerfect } from '../make-pixel-perfect/make-pixel-perfect'
import { smartRenameLayer } from '../smart-rename-layers/smart-rename-layer'
import { ungroupSingleLayerGroup } from '../ungroup-single-layer-groups/ungroup-single-layer-group'

export function cleanLayer (
  layer,
  {
    deleteHiddenLayers,
    pixelPerfect,
    smartRenameLayers,
    smartRenameLayersWhitelistRegex,
    smartSortLayers,
    ungroupSingleLayerGroups
  }
) {
  traverseLayer(layer, function (layer) {
    if (layer.type === 'PAGE' || layer.removed === true) {
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
        if (layer.type === 'PAGE' || layer.removed === true) {
          return
        }
        if (deleteHiddenLayers === true) {
          deleteHiddenLayer(layer)
          if (layer.removed === true) {
            return
          }
        }
        if (ungroupSingleLayerGroups === true) {
          ungroupSingleLayerGroup(layer)
          if (layer.removed === true) {
            return
          }
        }
        if (pixelPerfect === true) {
          makePixelPerfect(layer)
        }
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
