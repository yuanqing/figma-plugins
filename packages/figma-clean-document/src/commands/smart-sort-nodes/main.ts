import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'

import { getScope } from '../../utilities/get-scope.js'
import { getSiblingNodes } from '../../utilities/get-sibling-nodes.js'
import { showLoadingNotification } from '../../utilities/show-loading-notification.js'
import { smartSortNodes } from '../../utilities/smart-sort-nodes.js'

export default function (): void {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const groups = getSiblingNodes()
  const scope = getScope()
  const hideLoadingNotification = showLoadingNotification(
    `Sorting layers ${scope}…`
  )
  let didChange = false
  for (const nodes of groups) {
    didChange = smartSortNodes(nodes, false) || didChange
  }
  hideLoadingNotification()
  figma.closePlugin(
    didChange === true
      ? formatSuccessMessage(`Smart sorted layers ${scope}`)
      : 'No change to sort order'
  )
}
