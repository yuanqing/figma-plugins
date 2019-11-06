/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { getTextLayers } from '../get-text-layers'
import languages from './languages'

export function commandFactory (languageKey) {
  return async function () {
    const { apiKey } = await loadSettings(defaultSettings)
    if (typeof apiKey === 'undefined' || apiKey === '') {
      figma.closePlugin(
        formatErrorMessage(
          'Add an API key via Plugins › Language Tester › Set API Key'
        ),
        { timeout: 10000 }
      )
      return
    }
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    showUI({ visible: false })
    const notificationHandler = figma.notify('Translating…', { timeout: 60000 })
    addEventListener('TRANSLATE_RESULT', function (result) {
      notificationHandler.cancel()
      for (const { id, characters } of result) {
        const layer = figma.getNodeById(id)
        layer.characters = characters
      }
      figma.closePlugin(
        formatSuccessMessage(
          `Translated text ${scope} to ${languages[languageKey]}`
        )
      )
    })
    showUI({ visible: false })
    await loadFonts(layers)
    triggerEvent(
      'TRANSLATE_REQUEST',
      layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      languageKey,
      apiKey
    )
  }
}
