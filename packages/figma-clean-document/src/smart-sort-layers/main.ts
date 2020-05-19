import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'

import { getScope } from '../utilities/get-scope'
import { getSiblingLayerGroups } from '../utilities/get-sibling-layer-groups'
import { showLoadingNotification } from '../utilities/show-loading-notification'
import { smartSortLayers } from '../utilities/smart-sort-layers'

export default function () {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const groups = getSiblingLayerGroups()
  const scope = getScope()
  const hideLoadingNotification = showLoadingNotification(
    `Sorting layers ${scope}…`
  )
  let didChange = false
  for (const layers of groups) {
    didChange = smartSortLayers(layers, false) || didChange
  }
  hideLoadingNotification()
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage(`Smart sorted layers ${scope}`)
      : 'No change to sort order'
  )
}
