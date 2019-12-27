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
import { defaultSettings } from '../default-settings'
import { getSelectedLayers } from '../utilities/get-selected-layers'
import { getLayers } from './get-layers'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  const { searchCurrentPageOnly } = settings
  const layers = getLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No frames/components on page'))
    return
  }
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      currentPageId: figma.currentPage.id,
      layers: getLayers()
    })
  })
  addEventListener('SUBMIT', async function ({
    selectedLayerId,
    searchCurrentPageOnly
  }) {
    await saveSettings({
      ...settings,
      searchCurrentPageOnly
    })
    const layer = figma.getNodeById(selectedLayerId)
    figma.viewport.scrollAndZoomIntoView([layer])
    figma.currentPage.selection = [layer]
    figma.closePlugin(
      formatSuccessMessage(`Jumped to ${layer.type.toLowerCase()}`)
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 340 },
    {
      currentPageId: figma.currentPage.id,
      layers,
      searchCurrentPageOnly,
      selectedLayerId: getSelectedLayerId()
    }
  )
}

function getSelectedLayerId () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length === 1 ? selectedLayers[0].id : null
}
