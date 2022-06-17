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

import { filterTextNodes } from '../utilities/filter-text-nodes.js'
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
    const { caseSensitive, findString, useRegularExpression } = settings
    const formattedFindString =
      useRegularExpression === true
        ? `/${findString}/g${caseSensitive === true ? '' : 'i'}`
        : `“${findString}”`
    const scope =
      figma.currentPage.selection.length === 0 ? 'on page' : 'in selection'
    const count = await findAndReplaceAsync(
      filterTextNodes(getSelectedNodesOrAllNodes()),
      settings
    )
    if (count === 0) {
      figma.closePlugin(
        formatErrorMessage(`No matches for ${formattedFindString} ${scope}`)
      )
      return
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Replaced ${count} ${pluralize(
          count,
          'match',
          'matches'
        )} for ${formattedFindString} ${scope}`
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
    { height: 284, title: 'Find and Replace', width: 240 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
