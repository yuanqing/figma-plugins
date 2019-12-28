import {
  formatSuccessMessage,
  sortLayersByName,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'

export default function () {
  const result = sortLayersByName(figma.root.children)
  updateLayersSortOrder(result)
  figma.closePlugin(formatSuccessMessage('Sorted pages'))
}
