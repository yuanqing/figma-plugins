/* global figma */
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export default function () {
  const result = sortLayersByName(figma.root.children)
  updateLayersSortOrder(result)
  figma.closePlugin('✔ \u00a0 Sorted pages')
}
