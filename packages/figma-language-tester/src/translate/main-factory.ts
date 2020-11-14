import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadFontsAsync,
  once,
  showUI
} from '@create-figma-plugin/utilities'

import { getTextLayers } from '../utilities/get-text-layers'
import languages from '../utilities/languages.json'

export function mainFactory(languageKey: string) {
  return async function () {
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
      languageKey,
      layers: layers.map(function ({ id, characters }) {
        return { characters, id }
      }),
      scope
    })
  }
}
