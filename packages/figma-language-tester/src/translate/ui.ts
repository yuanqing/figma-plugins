import { emit, once } from '@create-figma-plugin/utilities'

import { translateAsync } from '../utilities/translate-async.js'
import {
  LanguageKey,
  TextNodePlainObject,
  TranslateRequestHandler,
  TranslateResultHandler
} from '../utilities/types.js'

export default function (): void {
  once<TranslateRequestHandler>(
    'TRANSLATE_REQUEST',
    async function (
      textNodePlainObjects: Array<TextNodePlainObject>,
      languageKey: LanguageKey
    ) {
      const promises = textNodePlainObjects.map(function (
        textNodePlainObject: TextNodePlainObject
      ) {
        return translateAsync(textNodePlainObject, languageKey)
      })
      const result = await Promise.all(promises)
      emit<TranslateResultHandler>('TRANSLATE_RESULT', result, languageKey)
    }
  )
}
