import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { sortPagesByName } from 'figma-sort-layers/src/sort-pages-by-name/utilities/sort-pages-by-name'
import { updatePagesSortOrder } from 'figma-sort-layers/src/sort-pages-by-name/utilities/update-pages-sort-order'

export default function (): void {
  const result = sortPagesByName()
  const didChange = updatePagesSortOrder(result)
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages by name')
      : 'No change to page sort order'
  )
}
