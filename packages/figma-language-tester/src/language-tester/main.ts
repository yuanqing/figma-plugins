import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadFontsAsync,
  on,
  once,
  showUI
} from '@create-figma-plugin/utilities'

import { extractText } from '../utilities/extract-text.js'
import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes.js'
import { languages } from '../utilities/languages.js'
import {
  LanguageKey,
  TextNodePlainObject,
  TranslateRequestHandler,
  TranslateResultHandler
} from '../utilities/types.js'
import { updateTextNodesAsync } from '../utilities/update-text-nodes-async.js'
import {
  CloseUIHandler,
  ResetLanguageHandler,
  SelectionChangedHandler,
  SetLanguageHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const textNodes = getSelectedTextNodes()
  if (textNodes.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const originalText: Record<string, string> = {} // maps `node.id` to the original strings
  once<CloseUIHandler>('CLOSE_UI', async function () {
    await resetLanguageAsync(originalText)
    figma.closePlugin()
  })
  figma.on('selectionchange', function () {
    const hasSelection = getSelectedTextNodes().length > 0
    emit<SelectionChangedHandler>('SELECTION_CHANGED', hasSelection)
  })
  on<SetLanguageHandler>('SET_LANGUAGE', function (languageKey: LanguageKey) {
    const textNodes = getSelectedTextNodes()
    const textNodePlainObjects = extractText(textNodes)
    for (const { id, characters } of textNodePlainObjects) {
      originalText[id] = characters
    }
    emit<TranslateRequestHandler>(
      'TRANSLATE_REQUEST',
      textNodePlainObjects,
      languageKey
    )
  })
  on<TranslateResultHandler>(
    'TRANSLATE_RESULT',
    async function (
      textNodePlainObjects: Array<TextNodePlainObject>,
      languageKey: LanguageKey
    ) {
      await updateTextNodesAsync(textNodePlainObjects)
      figma.notify(
        formatSuccessMessage(`Translated to ${languages[languageKey]}`)
      )
    }
  )
  on<ResetLanguageHandler>('RESET_LANGUAGE', async function () {
    await resetLanguageAsync(originalText)
  })
  showUI({ height: 332, width: 240 })
}

async function resetLanguageAsync(
  originalText: Record<string, string>
): Promise<void> {
  for (const id in originalText) {
    const node = figma.getNodeById(id)
    if (node === null) {
      continue
    }
    const textNode = node as TextNode
    await loadFontsAsync([textNode])
    if (textNode.characters === originalText[id]) {
      continue
    }
    textNode.characters = originalText[id]
  }
}
