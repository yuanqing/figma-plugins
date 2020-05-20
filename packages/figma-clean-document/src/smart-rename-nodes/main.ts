import {
  emit,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { mainFactory } from '../utilities/main-factory'
import { smartRenameNode } from '../utilities/smart-rename-node'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const { smartRenameLayersWhitelist } = settings
    const smartRenameNodesWhitelistRegex =
      smartRenameLayersWhitelist === ''
        ? null
        : new RegExp(smartRenameLayersWhitelist)
    mainFactory({
      processNode: function (node: SceneNode) {
        return smartRenameNode(node, smartRenameNodesWhitelistRegex)
      },
      stopTraversal: function (node: SceneNode) {
        return (
          smartRenameNodesWhitelistRegex !== null &&
          smartRenameNodesWhitelistRegex.test(node.name) === true
        )
      },
      createLoadingMessage: function (scope: string) {
        return `Renaming layers ${scope}…`
      },
      createSuccessMessage: function (scope: string, count: number) {
        return `Renamed ${count} ${pluralize(count, 'layer')} ${scope}`
      },
      createFailureMessage: function (scope: string) {
        return `No layers renamed ${scope}`
      }
    })()
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 172 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
