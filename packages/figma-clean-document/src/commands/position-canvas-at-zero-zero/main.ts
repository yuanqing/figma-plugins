import { formatSuccessMessage } from '@create-figma-plugin/utilities'

import { positionAllNodesAtZeroZero } from '../../utilities/position-all-nodes-at-zero-zero.js'

export default function (): void {
  const didChange = positionAllNodesAtZeroZero()
  if (didChange === true) {
    figma.viewport.scrollAndZoomIntoView(figma.currentPage.children)
    figma.closePlugin(formatSuccessMessage('Positioned canvas at (0, 0)'))
    return
  }
  figma.closePlugin('No change to layer positions')
}
