import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'

import { getScope } from '../utilities/get-scope'
import { getSiblingNodes } from '../utilities/get-sibling-nodes'
import { showLoadingNotification } from '../utilities/show-loading-notification'
import { smartSortNodes } from '../utilities/smart-sort-nodes'

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
