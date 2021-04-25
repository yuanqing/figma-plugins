import { EventHandler } from '@create-figma-plugin/utilities'

import { Settings } from '../../utilities/types'

export type SelectNodesByNameSettings = Settings['selectLayersByName']
export type SelectNodesByNameProps = SelectNodesByNameSettings & {
  hasSelection: boolean
}
export type FormState = SelectNodesByNameProps

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: SelectNodesByNameSettings) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}
