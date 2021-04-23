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
import { Settings } from '../utilities/types'
import {
  CloseUIHandler,
  SelectionChangedHandler,
  SmartRenameNodesProps,
  SubmitHandler
} from './utilities/types'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (
      smartRenameLayersWhitelist: Settings['smartRenameLayersWhitelist']
    ) {
      await saveSettingsAsync({
        ...settings,
        smartRenameLayersWhitelist
      })
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
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI<SmartRenameNodesProps>(
    { height: 172, width: 240 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
