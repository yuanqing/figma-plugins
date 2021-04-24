import { EventHandler } from '@create-figma-plugin/utilities'

import { Settings } from '../../utilities/types'

export type SettingsProps = Settings
export type FormState = Settings

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
