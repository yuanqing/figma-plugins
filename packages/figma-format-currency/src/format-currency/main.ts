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

import {
  CloseUIHandler,
  SelectionChangedHandler
} from '../convert-currency/utilities/types'
import { defaultSettings } from '../utilities/default-settings'
import { getSelectedTextNodes } from '../utilities/get-selected-text-nodes'
import {
  CurrencyFormat,
  LocaleCode,
  TextNodePlainObject
} from '../utilities/types'
import { FormatCurrencyProps, SubmitHandler } from './utilities/types'

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
        currencyFormat: CurrencyFormat
        localeCode: LocaleCode
      }
    ) {
      const { currencyFormat, localeCode } = options
      await saveSettingsAsync({
        ...settings,
        formatCurrency: {
          currencyFormat
        },
        localeCode
      })
      for (const { id, characters } of textNodePlainObjects) {
        const node = getSceneNodeById<TextNode>(id)
        await loadFontsAsync([node])
        node.characters = characters
      }
      figma.closePlugin(
        formatSuccessMessage('Formatted currencies in selection')
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
  showUI<FormatCurrencyProps>(
    { height: 333, width: 240 },
    {
      ...settings.formatCurrency,
      localeCode: settings.localeCode,
      textNodePlainObjects
    }
  )
}
