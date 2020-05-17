import {
  formatSuccessMessage,
  sortLayersByName,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

export default function () {
  const result = sortLayersByName(figma.root.children)
  const didChange = updateNodesSortOrder(result)
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages')
      : 'No change to page sort order'
  )
}
