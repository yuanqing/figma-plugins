import {
  addEventListener,
  loadSettings,
  mapNumberToWord,
  onSelectionChange,
  pluralize,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { defaultSettings } from '../utilities/default-settings'
import { smartRenameLayer } from '../utilities/smart-rename-layer'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  onSelectionChange(function (selectedLayers) {
    triggerEvent('SELECTION_CHANGED', {
      hasSelection: selectedLayers.length > 0
    })
  })
  addEventListener('SUBMIT', async function (settings) {
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
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 172 },
    { ...settings, hasSelection: figma.currentPage.selection.length > 0 }
  )
}
