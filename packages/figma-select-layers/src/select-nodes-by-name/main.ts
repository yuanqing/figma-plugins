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

import { defaultSettings, settingsKey } from '../utilities/settings.js'
import { filterNodesByName } from './utilities/filter-nodes-by-name.js'
import {
  CloseUIHandler,
  SelectionChangedHandler,
  SelectNodesByNameProps,
  SelectNodesByNameSettings,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function ({ exactMatch, layerName }: SelectNodesByNameSettings) {
      await saveSettingsAsync(
        {
          ...settings,
          selectLayersByName: { exactMatch, layerName }
        },
        settingsKey
      )
      const scope =
        figma.currentPage.selection.length === 0
          ? 'on page'
          : 'within selection'
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
    }
  )
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  const { layerName, exactMatch } = settings.selectLayersByName
  showUI<SelectNodesByNameProps>(
    { height: 173, title: 'Select Layers by Name', width: 240 },
    {
      exactMatch,
      hasSelection: figma.currentPage.selection.length > 0,
      layerName
    }
  )
}
