import { formatSuccessMessage } from '@create-figma-plugin/utilities'
import { getLayersInScope } from '../utilities/get-layers-in-scope'
import { smartSortLayers } from '../utilities/smart-sort-layers'

export default function () {
  const groups = getLayersInScope()
  const scope =
    figma.currentPage.selection.length === 0
      ? 'layers on page'
      : 'selected layers'
  const notificationHandler = figma.notify(`Sorting layers ${scope}…`, {
    timeout: 60000
  })
  let didChange = false
  for (const layers of groups) {
    didChange = smartSortLayers(layers) || didChange
  }
  notificationHandler.cancel()
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage(`Smart sorted ${scope}`)
      : 'No change to sort order'
  )
}
