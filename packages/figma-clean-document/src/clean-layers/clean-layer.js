import { traverseLayer } from '@create-figma-plugin/utilities'
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
    ungroupSingleLayerGroups
  }
) {
  let didChange = false
  traverseLayer(layer, function (layer) {
    if (smartRenameLayers === true) {
      didChange =
        smartRenameLayer(layer, smartRenameLayersWhitelistRegex) || didChange
    }
  })
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
      return layer.type !== 'INSTANCE'
    }
  )
  return didChange
}
