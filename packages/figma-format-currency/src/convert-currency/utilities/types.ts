import { EventHandler } from '@create-figma-plugin/utilities'

import {
  CurrencyCode,
  LocaleCode,
  PreviewItem,
  Status,
  TextNodePlainObject
} from '../../utilities/types.js'

export type ConvertCurrencyProps = {
  currencyCode: CurrencyCode
  roundNumbers: boolean
  localeCode: LocaleCode
  textNodePlainObjects: Array<TextNodePlainObject>
}
export type FormState = {
  currencyCode: null | CurrencyCode
  roundNumbers: boolean
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
      currencyCode: CurrencyCode
      localeCode: LocaleCode
      roundNumbers: boolean
    }
  ) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (textNodePlainObjects: Array<TextNodePlainObject>) => void
}
