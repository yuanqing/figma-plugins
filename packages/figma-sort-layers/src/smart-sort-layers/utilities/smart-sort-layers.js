import { smartSortChildLayers } from './smart-sort-child-layers'

export function smartSortLayers (layers) {
  const parentLayer = layers[0].parent
  if (
    parentLayer.layoutMode === 'HORIZONTAL' ||
    parentLayer.layoutMode === 'VERTICAL'
  ) {
    return null
  }
  const layerIds = collectLayerIds(layers)
  return smartSortChildLayers(parentLayer, layerIds)
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
