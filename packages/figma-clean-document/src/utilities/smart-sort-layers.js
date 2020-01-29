import {
  compareObjects,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-layers/utilities/smart-sort-child-layers'
import { isLayerAnIllustration } from './is-layer-an-illustration'
import { isLayerWithinInstance } from './is-layer-within-instance'
import { traverseLayerDepthFirst } from './traverse-layer-depth-first'

export function smartSortLayers (layers) {
  if (layers.length === 0 || isLayerWithinInstance(layers[0]) === true) {
    return false
  }
  let didChange = false
  const parentLayer = layers[0].parent
  const layerIds = collectLayerIds(layers.slice().reverse())
  const result = smartSortChildLayers(parentLayer, layerIds)
  if (
    result !== null &&
    compareObjects(layerIds, collectLayerIds(result)) === false
  ) {
    updateLayersSortOrder(result)
    didChange = true
  }
  for (const layer of layers) {
    traverseLayerDepthFirst(
      layer,
      function (parentLayer) {
        const layers = parentLayer.children
        if (typeof layers === 'undefined') {
          return
        }
        const layerIds = collectLayerIds(layers.slice().reverse())
        const result = smartSortChildLayers(parentLayer, layerIds)
        if (
          result !== null &&
          compareObjects(layerIds, collectLayerIds(result)) === false
        ) {
          updateLayersSortOrder(result)
          didChange = true
        }
      },
      function (layer) {
        return (
          layer.type === 'INSTANCE' || isLayerAnIllustration(layer) === true
        )
      }
    )
  }
  return didChange
}

function collectLayerIds (layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}
