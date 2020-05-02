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
import { smartRenameLayer } from '../utilities/smart-rename-layer'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: figma.currentPage.selection.length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const { smartRenameLayersWhitelist } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist === ''
        ? null
        : new RegExp(smartRenameLayersWhitelist)
    mainFactory({
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
        return `Renamed ${count} ${pluralize(count, 'layer')} ${scope}`
      },
      createFailureMessage: function (scope) {
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
