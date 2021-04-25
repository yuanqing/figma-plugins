import {
  emit,
  extractAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  loadFontsAsync,
  once,
  showUI
} from '@create-figma-plugin/utilities'

import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes'
import { languages } from '../utilities/languages'
import {
  LanguageKey,
  TextNodePlainObject,
  TranslateRequestHandler,
  TranslateResultHandler
} from '../utilities/types'
import { updateTextNodesAsync } from '../utilities/update-text-nodes-async'

export function mainFactory(languageKey: LanguageKey) {
  return async function (): Promise<void> {
    const textNodes = getSelectedTextNodes()
    if (textNodes.length === 0) {
      figma.closePlugin(formatErrorMessage('Select one or more text layers'))
      return
    }
    once<TranslateResultHandler>(
      'TRANSLATE_RESULT',
      async function (
        textNodePlainObjects: Array<TextNodePlainObject>,
        languageKey: LanguageKey
      ) {
        await updateTextNodesAsync(textNodePlainObjects)
        figma.closePlugin(
          formatSuccessMessage(`Translated to ${languages[languageKey]}`)
        )
      }
    )
    await loadFontsAsync(textNodes)
    showUI({ visible: false })
    const textNodePlainObjects = extractAttributes(textNodes, [
      'id',
      'characters'
    ])
    emit<TranslateRequestHandler>(
      'TRANSLATE_REQUEST',
      textNodePlainObjects,
      languageKey
    )
  }
}
