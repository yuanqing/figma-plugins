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
  let didChange = false
  traverseLayer(layer, function (layer) {
    if (layer.type === 'PAGE' || layer.removed === true) {
      return
    }
    if (smartRenameLayers === true) {
      didChange =
        smartRenameLayer(layer, smartRenameLayersWhitelistRegex) || didChange
    }
  })
  traverseLayer(
    layer,
    function (layer) {
      if (layer.type === 'PAGE' || layer.removed === true) {
        return
      }
      if (deleteHiddenLayers === true) {
        didChange = deleteHiddenLayer(layer) || didChange
        if (layer.removed === true) {
          return
        }
      }
      if (ungroupSingleLayerGroups === true) {
        didChange = ungroupSingleLayerGroup(layer) || didChange
        if (layer.removed === true) {
          return
        }
      }
      if (pixelPerfect === true) {
        didChange = makePixelPerfect(layer) || didChange
      }
      if (smartSortLayers === true) {
        const result = smartSortChildLayers(layer)
        if (result !== null) {
          didChange = true
          updateLayersSortOrder(result)
        }
      }
    },
    function (layer) {
      return layer.type !== 'INSTANCE'
    }
  )
  return didChange
}
