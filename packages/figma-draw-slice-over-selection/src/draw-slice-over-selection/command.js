/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { calculateMaximumBounds } from './calculate-maximum-bounds'
import { defaultSettings } from '../default-settings'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length !== 0
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { padding } = settings
    const maximumBounds = calculateMaximumBounds(figma.currentPage.selection)
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
  showUI({ width: 240, height: 140 }, settings)
}
