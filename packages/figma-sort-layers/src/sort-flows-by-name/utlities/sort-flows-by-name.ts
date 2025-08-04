import naturalCompare from 'natural-compare-lite'

import { FlowStartingPoint } from './types.js'

export function sortFlowsByName(): Array<FlowStartingPoint> {
  return figma.currentPage.flowStartingPoints.slice().sort(function (a, b) {
    const aName = a.name.toLowerCase()
    const bName = b.name.toLowerCase()
    if (aName !== bName) {
      return naturalCompare(aName, bName)
    }
    return naturalCompare(a.nodeId, b.nodeId)
  })
}
