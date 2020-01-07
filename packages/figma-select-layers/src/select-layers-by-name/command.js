import {
  addEventListener,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettings,
  mapNumberToWord,
  onSelectionChange,
  pluralize,
  saveSettings,
  showUI,
  traverseLayer,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'

export default async function () {
  const { selectLayersByName: settings } = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length > 0,
      layers: getLayerIdsAndNames()
    })
  })
  addEventListener('SUBMIT', async function ({
    exactMatch,
    hasSelection,
    layerName,
    result
  }) {
    await saveSettings({ exactMatch, layerName })
    const scope = hasSelection > 0 ? 'within selection' : 'on page'
    const selection = result.map(function ({ id }) {
      return figma.getNodeById(id)
    })
    figma.currentPage.selection = selection
    figma.viewport.scrollAndZoomIntoView(selection)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${mapNumberToWord(selection.length)} ${pluralize(
          selection.length,
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
      layers: getLayerIdsAndNames(),
      hasSelection: figma.currentPage.selection.length > 0
    }
  )
}

export function getLayerIdsAndNames () {
  const result = []
  const layers = getSelectedLayersOrAllLayers()
  for (const layer of layers) {
    traverseLayer(layer, function ({ id, name }) {
      result.push({ id, name })
    })
  }
  return result
}
