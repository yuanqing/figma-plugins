/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { getTextLayers } from '../utilities/get-text-layers'

export function commandFactory (createSuccessMessage) {
  return async function () {
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    const { locale, ...settings } = await loadSettings(defaultSettings)
    addEventListener('SUBMIT', async function (locale) {
      await saveSettings({
        ...settings,
        locale
      })
      const { layers, scope } = getTextLayers()
      await loadFonts(layers)
      triggerEvent(
        'FORMAT_CURRENCY_REQUEST',
        layers.map(function ({ id, characters }) {
          return { id, characters }
        }),
        scope,
        locale
      )
    })
    addEventListener('FORMAT_CURRENCY_RESULT', function (
      result,
      scope,
      locale
    ) {
      for (const { id, characters } of result) {
        const layer = figma.getNodeById(id)
        layer.characters = characters
      }
      figma.closePlugin(
        formatSuccessMessage(createSuccessMessage(scope, locale))
      )
    })
    showUI({ width: 240, height: 88 }, { locale })
  }
}
