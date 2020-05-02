import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { getSelectedLayers } from '../utilities/get-selected-layers'
import { offsetLayerSize } from './utilities/offset-layer-size'
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
    emit('SELECTION_CHANGED', {
      selectedLayers: getSelectedLayers()
    })
  })
  once('SUBMIT', async function (settings) {
    const {
      selectedLayers,
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    } = settings
    await saveSettingsAsync({
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    })
    offsetLayerSize(
      selectedLayers,
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    )
    updateSelectedLayers(selectedLayers)
    figma.closePlugin(formatSuccessMessage('Offset layer size'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 140 }, { ...settings, selectedLayers })
}
