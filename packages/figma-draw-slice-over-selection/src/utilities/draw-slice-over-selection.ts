import { computeMaximumBounds } from '@create-figma-plugin/utilities'

export function drawSliceOverSelection (padding) {
  const maximumBounds = computeMaximumBounds(
    figma.currentPage.selection.slice()
  )
  const slice = figma.createSlice()
  const width = maximumBounds[1].x - maximumBounds[0].x + 2 * padding
  const height = maximumBounds[1].y - maximumBounds[0].y + 2 * padding
  slice.x = maximumBounds[0].x - padding
  slice.y = maximumBounds[0].y - padding
  slice.resize(width, height)
  slice.name = '@SliceOverSelection'
  slice.locked = true
  return slice
}
