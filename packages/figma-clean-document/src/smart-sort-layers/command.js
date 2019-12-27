import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { getLayersInScope } from '../get-layers-in-scope'
import { smartSortLayers } from './smart-sort-layers'

export default function () {
  const notificationHandler = figma.notify('Sorting layers…', {
    timeout: 60000
  })
  const groups = getLayersInScope()
  let didChange = false
  for (const layers of groups) {
    didChange = smartSortLayers(layers) || didChange
  }
  notificationHandler.cancel()
  const scope =
    figma.currentPage.selection.length === 0
      ? 'layers on page'
      : 'selected layers'
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage(`Smart sorted ${scope}`)
      : 'No change to sort order'
  )
}
