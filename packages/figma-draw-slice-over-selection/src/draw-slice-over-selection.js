import { calculateMaximumBounds } from './calculate-maximum-bounds'

export default function (figma) {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin('Select one or more layers')
    return
  }
  const maximumBounds = calculateMaximumBounds(selection)
  const slice = figma.createSlice()
  const width = maximumBounds[1].x - maximumBounds[0].x
  const height = maximumBounds[1].y - maximumBounds[0].y
  slice.x = maximumBounds[0].x
  slice.y = maximumBounds[0].y
  slice.resize(width, height)
  slice.name = '@SliceOverSelection'
  slice.locked = true
  figma.closePlugin('✔ Drew slice over selection')
}
