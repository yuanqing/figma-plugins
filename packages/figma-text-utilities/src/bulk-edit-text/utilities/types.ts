import { EventHandler } from '@create-figma-plugin/utilities'

export type BulkEditTextProps = {
  identicalTextNodeCount: number
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (identicalTextNodeCount: number) => void
}
