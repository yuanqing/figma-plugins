import type { EventHandler } from '@create-figma-plugin/utilities'

export type Settings = {
  horizontalOffset: null | number
  verticalOffset: null | number
}
export type MoveNodesProps = Settings & {
  hasSelection: boolean
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
