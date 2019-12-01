import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export function sortLayers (layers) {
  const result = sortLayersByName(layers)
  updateLayersSortOrder(result)
}
