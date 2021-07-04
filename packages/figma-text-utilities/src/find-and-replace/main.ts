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

import { findAndReplaceAsync } from './utilities/find-and-replace-async.js'
import { defaultSettings, settingsKey } from './utilities/settings.js'
import {
  CloseUIHandler,
  FindAndReplaceProps,
  SelectionChangedHandler,
  Settings,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings, settingsKey)
    const { findString } = settings
    const scope =
      figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
    const count = await findAndReplaceAsync(
      getSelectedNodesOrAllNodes(),
      settings
    )
    if (count === 0) {
      figma.closePlugin(
        formatErrorMessage(`“${findString}” not found ${scope}`)
      )
      return
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Replaced ${count} ${pluralize(
          count,
          'instance'
        )} of “${findString}” ${scope}`
      )
    )
  })
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      figma.currentPage.selection.length > 0
    )
  })
  showUI<FindAndReplaceProps>(
    { height: 265, title: 'Find and Replace', width: 240 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
