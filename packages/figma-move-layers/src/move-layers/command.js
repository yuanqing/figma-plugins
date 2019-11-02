/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  pluralize,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'

export default async function () {
  const selectedLayers = figma.currentPage.selection
  if (selectedLayers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('MOVE_LAYERS', async function (settings) {
    await saveSettings(settings)
    const { horizontalOffset, verticalOffset } = settings
    if (horizontalOffset === 0 && verticalOffset === 0) {
      figma.closePlugin()
      return
    }
    for (const layer of selectedLayers) {
      layer.x += horizontalOffset
      layer.y += verticalOffset
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Moved selected ${pluralize(selectedLayers.length, 'layer')}`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 128, data: settings })
}
