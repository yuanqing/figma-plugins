import {
  formatSuccessMessage,
  sortLayersByName,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'

export default function () {
  const result = sortLayersByName(figma.root.children)
  const didChange = updateLayersSortOrder(result)
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages')
      : 'No change to page sort order'
  )
}
