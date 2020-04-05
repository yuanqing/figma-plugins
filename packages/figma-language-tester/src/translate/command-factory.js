import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  on,
  showUI
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
    on('TRANSLATE_RESULT', function ({ layers }) {
      notificationHandler.cancel()
      for (const { id, characters } of layers) {
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
    emit('TRANSLATE_REQUEST', {
      apiKey,
      languageKey,
      layers: layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      scope
    })
  }
}
