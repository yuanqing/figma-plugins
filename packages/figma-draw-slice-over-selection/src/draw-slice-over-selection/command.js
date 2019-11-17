/* global figma */
import { calculateMaximumBounds } from './calculate-maximum-bounds'
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettings(defaultSettings)
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
    figma.closePlugin(formatSuccessMessage('Drew slice over selection'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 124 }, settings)
}
