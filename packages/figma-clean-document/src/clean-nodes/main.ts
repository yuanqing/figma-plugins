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

import { cleanNodes } from '../utilities/clean-nodes'
import { defaultSettings } from '../utilities/default-settings'
import { getScope } from '../utilities/get-scope'
import { getSiblingNodes } from '../utilities/get-sibling-nodes'
import { showLoadingNotification } from '../utilities/show-loading-notification'
import { smartSortNodes } from '../utilities/smart-sort-nodes'

export default async function (): Promise<void> {
  if (figma.currentPage.children.length === 0) {
    figma.closePlugin(formatErrorMessage('No layers on page'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
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
        cleanNodes(node, {
          deleteHiddenLayers,
          pixelPerfect,
          skipLockedLayers,
          smartRenameLayers,
          smartRenameLayersWhitelistRegex,
          ungroupSingleLayerGroups
        }) || didChange
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
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { height: 416, width: 240 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
