import { formatSuccessMessage } from '@create-figma-plugin/utilities'

import { sortFlowsByName } from './utlities/sort-flows-by-name.js'

export default function (): void {
  const originalFlowStartingPoints =
    figma.currentPage.flowStartingPoints.slice()
  const newFlowStartingPoints = sortFlowsByName()
  const didChange = (function () {
    const index = 0
    while (index < originalFlowStartingPoints.length) {
      const before = originalFlowStartingPoints[index]
      const after = newFlowStartingPoints[index]
      if (before.name !== after.name || before.nodeId !== after.nodeId) {
        return true
      }
    }
  })()
  if (didChange === true) {
    figma.currentPage.flowStartingPoints = newFlowStartingPoints
    figma.closePlugin(formatSuccessMessage('Sorted flows by name'))
    return
  }
  figma.closePlugin('No change to flow sort order')
}
