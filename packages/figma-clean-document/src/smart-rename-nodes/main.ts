import {
  emit,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { mainFactory } from '../utilities/main-factory'
import { defaultSettings, settingsKey } from '../utilities/settings'
import { smartRenameNode } from '../utilities/smart-rename-node'
import { Settings } from '../utilities/types'
import {
  CloseUIHandler,
  SelectionChangedHandler,
  SmartRenameNodesProps,
  SubmitHandler
} from './utilities/types'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (
      smartRenameLayersWhitelist: Settings['smartRenameLayersWhitelist']
    ) {
      await saveSettingsAsync(
        {
          ...settings,
          smartRenameLayersWhitelist
        },
        settingsKey
      )
      const smartRenameNodesWhitelistRegex =
        smartRenameLayersWhitelist === ''
          ? null
          : new RegExp(smartRenameLayersWhitelist)
      mainFactory({
        createFailureMessage: function (scope: string) {
          return `No layers renamed ${scope}`
        },
        createLoadingMessage: function (scope: string) {
          return `Renaming layers ${scope}…`
        },
        createSuccessMessage: function (scope: string, count: number) {
          return `Renamed ${count} ${pluralize(count, 'layer')} ${scope}`
        },
        processNode: function (node: SceneNode) {
          return smartRenameNode(node, smartRenameNodesWhitelistRegex)
        },
        stopTraversal: function (node: SceneNode) {
          return (
            smartRenameNodesWhitelistRegex !== null &&
            smartRenameNodesWhitelistRegex.test(node.name) === true
          )
        }
      })()
    }
  )
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  const { smartRenameLayersWhitelist } = settings
  showUI<SmartRenameNodesProps>(
    { height: 168, width: 240 },
    {
      hasSelection: figma.currentPage.selection.length > 0,
      smartRenameLayersWhitelist
    }
  )
}
