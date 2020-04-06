import {
  emit,
  loadSettings,
  mapNumberToWord,
  on,
  pluralize,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { defaultSettings } from '../utilities/default-settings'
import { smartRenameLayer } from '../utilities/smart-rename-layer'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  on('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { smartRenameLayersWhitelist } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist === ''
        ? null
        : new RegExp(smartRenameLayersWhitelist)
    commandFactory({
      processLayer: function (layer) {
        return smartRenameLayer(layer, smartRenameLayersWhitelistRegex)
      },
      stopTraversal: function (layer) {
        return (
          smartRenameLayersWhitelistRegex !== null &&
          smartRenameLayersWhitelistRegex.test(layer.name) === true
        )
      },
      createLoadingMessage: function (scope) {
        return `Renaming layers ${scope}…`
      },
      createSuccessMessage: function (scope, count) {
        return `Renamed ${mapNumberToWord(count)} ${pluralize(
          count,
          'layer'
        )} ${scope}`
      },
      createFailureMessage: function (scope) {
        return `No layers renamed ${scope}`
      }
    })()
  })
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 172 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
