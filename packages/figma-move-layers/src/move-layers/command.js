/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  onSelectionChange,
  pluralize,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
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
    const { horizontalOffset, verticalOffset } = settings
    if (horizontalOffset === 0 && verticalOffset === 0) {
      figma.closePlugin()
      return
    }
    const selectedLayers = figma.currentPage.selection
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
  showUI({ width: 240, height: 116 }, { ...settings, hasSelection: true })
}
