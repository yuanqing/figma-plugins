import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettings,
  mapNumberToWord,
  onSelectionChange,
  pluralize,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { filterLayersByName } from './utilities/filter-layers-by-name'

export default async function () {
  const { selectLayersByName: settings } = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length > 0
    })
  })
  addEventListener('SUBMIT', async function ({
    exactMatch,
    layerName,
    layerType
  }) {
    await saveSettings({ exactMatch, layerName, layerType })
    const scope =
      figma.currentPage.selection.length === 0 ? 'on page' : 'within selection'
    const layers = getSelectedLayersOrAllLayers()
    const result = filterLayersByName(layers, layerName, layerType, exactMatch)
    if (result.length === 0) {
      figma.closePlugin(formatErrorMessage(`No layers match “${layerName}”`))
      return
    }
    figma.currentPage.selection = result
    figma.viewport.scrollAndZoomIntoView(result)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${mapNumberToWord(result.length)} ${pluralize(
          result.length,
          'layer'
        )} ${scope}`
      )
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  const { layerName, exactMatch } = settings
  showUI(
    { width: 240, height: 164 },
    {
      layerName,
      exactMatch,
      hasSelection: figma.currentPage.selection.length > 0
    }
  )
}
