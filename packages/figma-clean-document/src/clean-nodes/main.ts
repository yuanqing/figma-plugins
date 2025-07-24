import {
  collapseLayer,
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  getSelectedNodesOrAllNodes,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
} from '@create-figma-plugin/utilities'

import { cleanNodesAsync } from '../utilities/clean-nodes-async.js'
import { getScope } from '../utilities/get-scope.js'
import { getSiblingNodes } from '../utilities/get-sibling-nodes.js'
import { defaultSettings, settingsKey } from '../utilities/settings.js'
import { showLoadingNotification } from '../utilities/show-loading-notification.js'
import { smartSortNodes } from '../utilities/smart-sort-nodes.js'
import { Settings } from '../utilities/types.js'
import {
  CleanNodesProps,
  CloseUIHandler,
  SelectionChangedHandler,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings, settingsKey)
    const {
      deleteHiddenLayers,
      pixelPerfect,
      skipLockedLayers,
      smartRenameLayers,
      smartRenameLayersWhitelist,
      ungroupSingleLayerGroups
    } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist === ''
        ? null
        : new RegExp(smartRenameLayersWhitelist)
    const scope = getScope()
    const hideLoadingNotification = showLoadingNotification(
      `Cleaning layers ${scope}…`
    )
    let didChange = false
    for (const node of getSelectedNodesOrAllNodes()) {
      didChange =
        (await cleanNodesAsync(node, {
          deleteHiddenLayers,
          pixelPerfect,
          skipLockedLayers,
          smartRenameLayers,
          smartRenameLayersWhitelistRegex,
          ungroupSingleLayerGroups
        })) || didChange
      collapseLayer(node)
    }
    if (settings.smartSortLayers === true) {
      for (const nodes of getSiblingNodes()) {
        didChange = smartSortNodes(nodes, skipLockedLayers) || didChange
      }
    }
    hideLoadingNotification()
    setRelaunchButton(figma.currentPage, 'cleanLayers')
    figma.closePlugin(
      didChange === true
        ? formatSuccessMessage(`Cleaned layers ${scope}`)
        : `No change to layers ${scope}`
    )
  })
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  showUI<CleanNodesProps>(
    { height: 416, title: 'Clean Layers', width: 240 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
