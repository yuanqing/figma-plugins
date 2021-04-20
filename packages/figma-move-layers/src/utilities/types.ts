import type { EventHandler } from '@create-figma-plugin/utilities'

export type MoveNodesSettings = {
  horizontalOffset: null | number
  verticalOffset: null | number
}
export type MoveNodesProps = MoveNodesSettings & {
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
  handler: (settings: MoveNodesSettings) => void
}
