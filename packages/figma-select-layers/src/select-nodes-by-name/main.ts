import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { filterNodesByName } from './utilities/filter-nodes-by-name'

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
    const nodes = getSelectedNodesOrAllNodes()
    const result = filterNodesByName(nodes, layerName, exactMatch)
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
    { height: 168, width: 240 },
    {
      exactMatch,
      hasSelection: figma.currentPage.selection.length > 0,
      layerName
    }
  )
}
