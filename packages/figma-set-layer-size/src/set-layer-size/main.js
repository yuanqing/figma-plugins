import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'
import { computeDimensions } from './utilities/compute-dimensions'
import { defaultSettings } from '../utilities/default-settings'
import { getSelectedLayers } from '../utilities/get-selected-layers'
import { setLayerSize } from './utilities/set-layer-size'
import { updateSelectedLayers } from '../utilities/update-selected-layers'

export default async function () {
  const selectedLayers = getSelectedLayers()
  if (selectedLayers.length === 0) {
    if (figma.currentPage.selection.length > 0) {
      figma.closePlugin(formatErrorMessage('Select layers outside instances'))
      return
    }
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    const selectedLayers = getSelectedLayers()
    emit('SELECTION_CHANGED', {
      selectedLayers,
      ...computeDimensions(selectedLayers)
    })
  })
  once('SUBMIT', async function (settings) {
    const { selectedLayers, width, height, resizeWithConstraints } = settings
    await saveSettingsAsync({ resizeWithConstraints })
    setLayerSize(selectedLayers, width, height, resizeWithConstraints)
    updateSelectedLayers(selectedLayers)
    figma.closePlugin(formatSuccessMessage('Set layer size'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 140 },
    { ...settings, selectedLayers, ...computeDimensions(selectedLayers) }
  )
}
