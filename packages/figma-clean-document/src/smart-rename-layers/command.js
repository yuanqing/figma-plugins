import {
  addEventListener,
  loadSettings,
  mapNumberToWord,
  pluralize,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../utilities/command-factory'
import { defaultSettings } from '../utilities/default-settings'
import { smartRenameLayer } from '../utilities/smart-rename-layer'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function (settings) {
    await saveSettings(settings)
    const { smartRenameLayersWhitelist } = settings
    const smartRenameLayersWhitelistRegex =
      smartRenameLayersWhitelist !== ''
        ? new RegExp(smartRenameLayersWhitelist)
        : null
    commandFactory({
      processLayer: function (layer) {
        return smartRenameLayer(layer, smartRenameLayersWhitelistRegex)
      },
      createLoadingMessage: function (scope) {
        return `Renaming layers ${scope}…`
      },
      createSuccessMessage: function (scope, count) {
        return `Smart renamed ${mapNumberToWord(count)} ${pluralize(
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
  showUI({ width: 240, height: 140 }, settings)
}
