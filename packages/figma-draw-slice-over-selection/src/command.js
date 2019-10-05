/* global figma */
import { calculateMaximumBounds } from './calculate-maximum-bounds'
import {
  addEventListener,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin('Select one or more layers')
    return
  }
  const settings = (await loadSettings()) || {
    padding: 0
  }
  addEventListener('DRAW_SLICE_OVER_SELECTION', async function (settings) {
    await saveSettings(settings)
    const { padding } = settings
    const maximumBounds = calculateMaximumBounds(selection)
    const slice = figma.createSlice()
    const width = maximumBounds[1].x - maximumBounds[0].x + 2 * padding
    const height = maximumBounds[1].y - maximumBounds[0].y + 2 * padding
    slice.x = maximumBounds[0].x - padding
    slice.y = maximumBounds[0].y - padding
    slice.resize(width, height)
    slice.name = '@SliceOverSelection'
    slice.locked = true
    figma.closePlugin(`✔ ${' '} Drew slice over selection`)
  })
  addEventListener('CANCEL', async function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 100, data: settings })
}
