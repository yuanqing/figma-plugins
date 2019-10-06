/* global figma */
import { smartSortChildLayers } from './smart-sort-child-layers'

export function smartSortSelectedLayers () {
  const selectedLayers = figma.currentPage.selection
  const parentLayer = selectedLayers[0].parent
  const layerIds = collectLayerIds(selectedLayers)
  return smartSortChildLayers(parentLayer, layerIds)
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
