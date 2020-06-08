import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadFontsAsync,
  loadSettingsAsync,
  once,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../default-settings'
import { getTextLayers } from '../get-text-layers'
import languages from './languages.json'

export function mainFactory(languageKey) {
  return async function () {
    const { apiKey } = await loadSettingsAsync(defaultSettings)
    if (typeof apiKey === 'undefined' || apiKey === '') {
      figma.closePlugin(
        formatErrorMessage(
          'Add an API key via Plugins › Language Tester › Set API Key'
        )
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
    once('TRANSLATE_RESULT', function ({ layers }) {
      notificationHandler.cancel()
      for (const { id, characters } of layers) {
        const layer = figma.getNodeById(id) as TextNode
        layer.characters = characters
      }
      figma.closePlugin(
        formatSuccessMessage(
          `Translated text ${scope} to ${languages[languageKey]}`
        )
      )
    })
    showUI({ visible: false })
    await loadFontsAsync(layers)
    emit('TRANSLATE_REQUEST', {
      apiKey,
      languageKey,
      layers: layers.map(function ({ id, characters }) {
        return { characters, id }
      }),
      scope
    })
  }
}
