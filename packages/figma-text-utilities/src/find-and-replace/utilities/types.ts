import { EventHandler } from '@create-figma-plugin/utilities'

export type Settings = {
  caseSensitive: boolean
  findString: string
  replaceString: string
}
export type FindAndReplaceProps = Settings & {
  hasSelection: boolean
}
export type FormState = FindAndReplaceProps

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}
