import { EventHandler } from '@create-figma-plugin/utilities'

import { languages } from './languages'

export type LanguageKey = keyof typeof languages

export type TextNodePlainObject = {
  id: string
  characters: string
}

export interface TranslateRequestHandler extends EventHandler {
  name: 'TRANSLATE_REQUEST'
  handler: (
    textNodePlainObjects: Array<TextNodePlainObject>,
    languageKey: LanguageKey
  ) => void
}
export interface TranslateResultHandler extends EventHandler {
  name: 'TRANSLATE_RESULT'
  handler: (
    textNodePlainObjects: Array<TextNodePlainObject>,
    languageKey: LanguageKey
  ) => void
}
