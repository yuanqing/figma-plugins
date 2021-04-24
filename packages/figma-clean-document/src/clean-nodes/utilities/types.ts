import { EventHandler } from '@create-figma-plugin/utilities'

import { Settings } from '../../utilities/types'

export type CleanNodesProps = Settings & {
  hasSelection: boolean
}
export type FormState = CleanNodesProps & {
  loading: boolean
}

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
