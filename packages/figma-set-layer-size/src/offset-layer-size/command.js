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
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    const selectedLayers = getSelectedLayers()
    triggerEvent('SELECTION_CHANGED', {
      selectedLayers
    })
  })
  addEventListener('SUBMIT', async function (settings) {
    const {
      selectedLayers,
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    } = settings
    await saveSettings({ offsetWidth, offsetHeight, resizeWithConstraints })
    offsetLayerSize(
      selectedLayers,
      offsetWidth,
      offsetHeight,
      resizeWithConstraints
    )
    updateSelectedLayers(selectedLayers)
    figma.closePlugin(formatSuccessMessage('Offset layer size'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 148 }, { ...settings, selectedLayers })
}
