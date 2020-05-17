import { formatSuccessMessage } from '@create-figma-plugin/utilities'

import { sortPagesByName } from './utilities/sort-pages-by-name'
import { updatePagesSortOrder } from './utilities/update-pages-sort-order'

export default function () {
  const result = sortPagesByName()
  const didChange = updatePagesSortOrder(result)
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages')
      : 'No change to page sort order'
  )
}
