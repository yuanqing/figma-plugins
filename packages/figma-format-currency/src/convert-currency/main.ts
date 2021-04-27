import {
  emit,
  extractAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  getSceneNodeById,
  loadFontsAsync,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes'
import {
  CurrencyCode,
  LocaleCode,
  TextNodePlainObject
} from '../utilities/types'
import {
  CloseUIHandler,
  ConvertCurrencyProps,
  SelectionChangedHandler,
  SubmitHandler
} from './utilities/types'

export default async function (): Promise<void> {
  const textNodes = getSelectedTextNodes()
  if (textNodes.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more text layers'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (
      textNodePlainObjects: Array<TextNodePlainObject>,
      options: {
        currencyCode: CurrencyCode
        localeCode: LocaleCode
        roundNumbers: boolean
      }
    ) {
      const { currencyCode, localeCode, roundNumbers } = options
      await saveSettingsAsync({
        ...settings,
        convertCurrency: {
          currencyCode,
          roundNumbers
        },
        localeCode
      })
      for (const { id, characters } of textNodePlainObjects) {
        const node = getSceneNodeById<TextNode>(id)
        await loadFontsAsync([node])
        node.characters = characters
      }
      figma.closePlugin(
        formatSuccessMessage(
          `Converted currencies in selection to ${currencyCode}`
        )
      )
    }
  )
  figma.on('selectionchange', function () {
    const textNodes = getSelectedTextNodes()
    const textNodePlainObjects = extractAttributes(textNodes, [
      'id',
      'characters'
    ])
    emit<SelectionChangedHandler>('SELECTION_CHANGED', textNodePlainObjects)
  })
  const textNodePlainObjects = extractAttributes(textNodes, [
    'id',
    'characters'
  ])
  showUI<ConvertCurrencyProps>(
    { height: 357, width: 240 },
    {
      ...settings.convertCurrency,
      localeCode: settings.localeCode,
      textNodePlainObjects
    }
  )
}
