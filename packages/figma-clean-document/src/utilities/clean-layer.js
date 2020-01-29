import { deleteHiddenLayer } from './delete-hidden-layer'
import { makePixelPerfect } from './make-pixel-perfect'
import { smartRenameLayer } from './smart-rename-layer'
import { ungroupSingleLayerGroup } from './ungroup-single-layer-group'

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
  if (layer.removed === true) {
    return false
  }
  if (deleteHiddenLayers === true && deleteHiddenLayer(layer) === true) {
    return true
  }
  let didChange = false
  if (typeof layer.children !== 'undefined') {
    const settings = {
      deleteHiddenLayers,
      pixelPerfect,
      smartRenameLayers,
      smartRenameLayersWhitelistRegex,
      ungroupSingleLayerGroups
    }
    const isInstance = layer.type === 'INSTANCE'
    if (isInstance || layer.type === 'COMPONENT') {
      settings.deleteHiddenLayers = false
    }
    if (isInstance || layer.type === 'VECTOR') {
      settings.pixelPerfect = false
    }
    if (isInstance) {
      settings.ungroupSingleLayerGroups = false
    }
    if (
      settings.deleteHiddenLayers === true ||
      settings.pixelPerfect === true ||
      settings.smartRenameLayers === true ||
      settings.smartRenameLayersWhitelistRegex === true ||
      settings.ungroupSingleLayerGroups === true
    ) {
      for (const childLayer of layer.children) {
        didChange = cleanLayer(childLayer, settings) || didChange
      }
    }
  }
  if (ungroupSingleLayerGroups === true) {
    if (ungroupSingleLayerGroup(layer) === true) {
      return true
    }
  }
  if (smartRenameLayers === true) {
    didChange =
      smartRenameLayer(layer, smartRenameLayersWhitelistRegex) || didChange
  }
  if (pixelPerfect === true) {
    didChange = makePixelPerfect(layer) || didChange
  }
  return didChange
}
