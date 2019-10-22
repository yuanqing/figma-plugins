import { traverseLayer } from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-child-layers'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'
import { deleteHiddenLayer } from '../delete-hidden-layers/delete-hidden-layer'
import { makePixelPerfect } from '../make-pixel-perfect/make-pixel-perfect'
import { smartRenameLayer } from '../smart-rename-layers/smart-rename-layer'
import { ungroupSingleLayerGroup } from '../ungroup-single-layer-groups/ungroup-single-layer-group'
import { isLayerAnIllustration } from './is-layer-an-illustration'

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
  traverseLayer(
    layer,
    function (layer) {
      if (smartRenameLayers === true) {
        didChange =
          smartRenameLayer(layer, smartRenameLayersWhitelistRegex) || didChange
      }
    },
    function (layer) {
      return layer.type !== 'PAGE'
    }
  )
  traverseLayer(
    layer,
    function (layer) {
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
    },
    function (layer) {
      return layer.type !== 'INSTANCE' && layer.type !== 'PAGE'
    }
  )
  if (smartSortLayers === true) {
    traverseLayer(
      layer,
      function (layer) {
        const result = smartSortChildLayers(layer)
        if (result !== null) {
          didChange = true
          updateLayersSortOrder(result)
        }
      },
      function (layer) {
        return (
          layer.type !== 'INSTANCE' &&
          layer.type !== 'PAGE' &&
          isLayerAnIllustration(layer) === false
        )
      }
    )
  }
  return didChange
}
