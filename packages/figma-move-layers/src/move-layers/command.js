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
import { defaultSettings } from '../utilities/default-settings'

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
    const isHorizontalOffsetValid =
      horizontalOffset !== 0 && horizontalOffset !== null
    const isVerticalOffsetValid =
      verticalOffset !== 0 && verticalOffset !== null
    if (isHorizontalOffsetValid === false && isVerticalOffsetValid === false) {
      figma.closePlugin()
      return
    }
    const selectedLayers = figma.currentPage.selection
    for (const layer of selectedLayers) {
      if (isHorizontalOffsetValid === true) {
        layer.x += horizontalOffset
      }
      if (isVerticalOffsetValid === true) {
        layer.y += verticalOffset
      }
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
