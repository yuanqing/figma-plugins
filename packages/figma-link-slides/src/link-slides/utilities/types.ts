import { EventHandler } from '@create-figma-plugin/utilities'

import { Settings } from '../../utilities/types.js'

export type LinkSlidesProps = Settings
export type FormState = LinkSlidesProps

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
