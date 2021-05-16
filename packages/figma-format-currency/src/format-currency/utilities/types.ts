import { EventHandler } from '@create-figma-plugin/utilities'

import {
  CurrencyFormat,
  LocaleCode,
  PreviewItem,
  Status,
  TextNodePlainObject
} from '../../utilities/types.js'

export type FormatCurrencyProps = {
  currencyFormat: CurrencyFormat
  localeCode: LocaleCode
  textNodePlainObjects: Array<TextNodePlainObject>
}
export type FormState = {
  currencyFormat: CurrencyFormat
  localeCode: null | LocaleCode
  previewItems: Array<PreviewItem>
  status: Status
  textNodePlainObjects: Array<TextNodePlainObject>
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (
    textNodePlainObjects: Array<TextNodePlainObject>,
    options: {
      currencyFormat: CurrencyFormat
      localeCode: LocaleCode
    }
  ) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (textNodePlainObjects: Array<TextNodePlainObject>) => void
}
