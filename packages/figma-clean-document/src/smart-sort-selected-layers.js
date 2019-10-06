/* global figma */
import { smartSortChildLayers } from './smart-sort-child-layers'

export function smartSortSelectedLayers () {
  const selectedLayers = figma.currentPage.selection
  if (checkIfLayersHaveCommonParent(selectedLayers) === false) {
    return false
  }
  const parentLayer = selectedLayers[0].parent
  const layerIds = collectLayerIds(selectedLayers)
  smartSortChildLayers(parentLayer, layerIds)
  return true
}

function checkIfLayersHaveCommonParent ([firstLayer, ...layers]) {
  if (layers.length === 0) {
    return true
  }
  const parentId = firstLayer.parent.id
  for (const layer of layers) {
    if (layer.parent.id !== parentId) {
      return false
    }
  }
  return true
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
