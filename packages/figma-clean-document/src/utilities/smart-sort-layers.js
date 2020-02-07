import {
  compareObjects,
  isLayerWithinInstance,
  traverseLayer,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-layers/utilities/smart-sort-child-layers'
import { isLayerAnIllustration } from './is-layer-an-illustration'

export function smartSortLayers (layers) {
  if (layers.length < 2 || isLayerWithinInstance(layers[0]) === true) {
    return false
  }
  const parentLayer = layers[0].parent
  if (hasAutoLayout(parentLayer) === true) {
    return false
  }
  let didChange = false
  const layerIds = collectLayerIds(layers)
  const result = smartSortChildLayers(parentLayer, layerIds)
  if (
    result !== null &&
    compareObjects(layerIds, collectLayerIds(result)) === false
  ) {
    updateLayersSortOrder(result)
    didChange = true
  }
  for (const layer of layers) {
    traverseLayer(
      layer,
      function (parentLayer) {
        if (hasAutoLayout(parentLayer) === true) {
          return
        }
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

function hasAutoLayout (layer) {
  return layer.layoutMode === 'HORIZONTAL' || layer.layoutMode === 'VERTICAL'
}
