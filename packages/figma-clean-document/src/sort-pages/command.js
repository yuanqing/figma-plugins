import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { updateLayersSortOrder } from 'figma-sort-layers/src/update-layers-sort-order'

export default function () {
  const result = sortLayersByName(figma.root.children)
  updateLayersSortOrder(result)
  figma.closePlugin(formatSuccessMessage('Sorted pages'))
}
