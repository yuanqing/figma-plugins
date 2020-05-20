import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from './utilities/default-settings'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
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
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 116 }, { ...settings, hasSelection: true })
}
