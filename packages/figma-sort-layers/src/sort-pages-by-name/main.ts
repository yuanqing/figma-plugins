import { formatSuccessMessage } from '@create-figma-plugin/utilities'

import { sortPagesByName } from './utilities/sort-pages-by-name.js'
import { updatePagesSortOrder } from './utilities/update-pages-sort-order.js'

export default function (): void {
  const result = sortPagesByName()
  const didChange = updatePagesSortOrder(result)
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages by name')
      : 'No change to page sort order'
  )
}
