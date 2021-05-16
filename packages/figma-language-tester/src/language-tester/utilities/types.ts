import { EventHandler } from '@create-figma-plugin/utilities'

import { LanguageKey } from '../../utilities/types.js'

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}
export interface SetLanguageHandler extends EventHandler {
  name: 'SET_LANGUAGE'
  handler: (languageKey: LanguageKey) => void
}
export interface ResetLanguageHandler extends EventHandler {
  name: 'RESET_LANGUAGE'
  handler: () => void
}
