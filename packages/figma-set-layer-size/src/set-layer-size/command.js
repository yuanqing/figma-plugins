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
import { computeDimensions } from './utilities/compute-dimensions'
import { defaultSettings } from '../utilities/default-settings'
import { getSelectedLayers } from '../utilities/get-selected-layers'
import { setLayerSize } from './utilities/set-layer-size'
import { updateSelectedLayers } from '../utilities/update-selected-layers'

export default async function () {
  const selectedLayers = getSelectedLayers()
  if (selectedLayers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    const selectedLayers = getSelectedLayers()
    triggerEvent('SELECTION_CHANGED', {
      selectedLayers,
      ...computeDimensions(selectedLayers)
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    const { selectedLayers, width, height, resizeWithConstraints } = settings
    await saveSettings({ resizeWithConstraints })
    setLayerSize(selectedLayers, width, height, resizeWithConstraints)
    updateSelectedLayers(selectedLayers)
    figma.closePlugin(formatSuccessMessage('Set layer size'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 148 },
    { ...settings, selectedLayers, ...computeDimensions(selectedLayers) }
  )
}
