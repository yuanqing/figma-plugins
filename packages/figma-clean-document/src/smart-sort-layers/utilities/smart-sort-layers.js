import {
  traverseLayer,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { smartSortChildLayers } from 'figma-sort-layers/src/smart-sort-layers/utilities/smart-sort-child-layers'
import { isLayerAnIllustration } from './is-layer-an-illustration'

export function smartSortLayers (layers) {
  let didChange = false
  const parentLayer = layers[0].parent
  const layerIds = collectLayerIds(layers)
  const result = smartSortChildLayers(parentLayer, layerIds)
  if (result !== null) {
    updateLayersSortOrder(result)
    didChange = true
  }
  for (const layer of layers) {
    traverseLayer(
      layer,
      function (layer) {
        const result = smartSortChildLayers(layer)
        if (result !== null) {
          updateLayersSortOrder(result)
          didChange = true
        }
      },
      function (layer) {
        return (
          layer.type !== 'INSTANCE' && isLayerAnIllustration(layer) === false
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
