import { deleteHiddenLayer } from './delete-hidden-layer'
import { makePixelPerfect } from './make-pixel-perfect'
import { smartRenameLayer } from './smart-rename-layer'
import { ungroupSingleLayerGroup } from './ungroup-single-layer-group'

export function cleanLayer (layer, settings) {
  const {
    deleteHiddenLayers,
    pixelPerfect,
    smartRenameLayers,
    smartRenameLayersWhitelistRegex,
    ungroupSingleLayerGroups
  } = settings
  if (layer.removed === true) {
    return false
  }
  if (deleteHiddenLayers === true && deleteHiddenLayer(layer) === true) {
    return true
  }
  if (
    ungroupSingleLayerGroups === true &&
    ungroupSingleLayerGroup(layer) === true
  ) {
    return true
  }
  let didChange = false
  if (typeof layer.children !== 'undefined') {
    if (layer.type === 'INSTANCE') {
      if (smartRenameLayers === true) {
        for (const childLayer of layer.children) {
          didChange =
            smartRenameLayer(childLayer, smartRenameLayersWhitelistRegex) ||
            didChange
        }
      }
    } else {
      for (const childLayer of layer.children) {
        didChange = cleanLayer(childLayer, settings) || didChange
      }
    }
  }
  if (pixelPerfect === true) {
    didChange = makePixelPerfect(layer) || didChange
  }
  if (smartRenameLayers === true) {
    didChange =
      smartRenameLayer(layer, smartRenameLayersWhitelistRegex) || didChange
  }
  return didChange
}
