import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedLayersOrAllLayers,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { filterLayersByName } from './utilities/filter-layers-by-name'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function ({ exactMatch, layerName }) {
    await saveSettingsAsync({
      ...settings,
      selectLayersByName: { exactMatch, layerName }
    })
    const scope =
      figma.currentPage.selection.length === 0 ? 'on page' : 'within selection'
    const layers = getSelectedLayersOrAllLayers()
    const result = filterLayersByName(layers, layerName, exactMatch)
    if (result.length === 0) {
      figma.closePlugin(
        formatErrorMessage(`No layers match “${layerName}” ${scope}`)
      )
      return
    }
    figma.currentPage.selection = result
    figma.viewport.scrollAndZoomIntoView(result)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${result.length} ${pluralize(
          result.length,
          'layer'
        )} ${scope}`
      )
    )
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const { layerName, exactMatch } = settings.selectLayersByName
  showUI(
    { width: 240, height: 168 },
    {
      layerName,
      exactMatch,
      hasSelection: figma.currentPage.selection.length > 0
    }
  )
}
