import { formatSuccessMessage, sortPages } from '@create-figma-plugin/utilities'

export default function () {
  const didChange = sortPages()
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage('Sorted pages')
      : 'No change to page sort order'
  )
}
