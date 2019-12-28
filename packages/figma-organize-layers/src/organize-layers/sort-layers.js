import {
  sortLayersByName,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'

export function sortLayers (layers) {
  const result = sortLayersByName(layers)
  updateLayersSortOrder(result)
}
