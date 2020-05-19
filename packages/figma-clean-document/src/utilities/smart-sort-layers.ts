import {
  compareObjects,
  isWithinInstance,
  traverseNode,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'
import { smartSortChildNodes } from 'figma-sort-layers/src/smart-sort-nodes/utilities/smart-sort-child-nodes'

import { isLayerAnIllustration } from './is-layer-an-illustration'

export function smartSortLayers(layers, skipLockedLayers) {
  if (layers.length < 2 || isWithinInstance(layers[0]) === true) {
    return false
  }
  const parentLayer = layers[0].parent
  if (hasAutoLayout(parentLayer) === true) {
    return false
  }
  let didChange = false
  const layerIds = collectLayerIds(layers)
  const result = smartSortChildNodes(parentLayer, layerIds)
  if (
    result !== null &&
    compareObjects(layerIds, collectLayerIds(result)) === false
  ) {
    updateNodesSortOrder(result)
    didChange = true
  }
  for (const layer of layers) {
    traverseNode(
      layer,
      function (parentLayer) {
        if (hasAutoLayout(parentLayer) === true) {
          return
        }
        if (skipLockedLayers === true && parentLayer.locked === true) {
          return
        }
        if ('children' in parentLayer) {
          const layers = parentLayer.children
          const layerIds = collectLayerIds(layers.slice().reverse())
          const result = smartSortChildNodes(parentLayer, layerIds)
          if (
            result !== null &&
            compareObjects(layerIds, collectLayerIds(result)) === false
          ) {
            updateNodesSortOrder(result)
            didChange = true
          }
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

function collectLayerIds(layers) {
  const result = []
  for (const layer of layers) {
    result.push(layer.id)
  }
  return result
}

function hasAutoLayout(layer) {
  return layer.layoutMode === 'HORIZONTAL' || layer.layoutMode === 'VERTICAL'
}
