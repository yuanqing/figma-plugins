import { EventHandler } from '@create-figma-plugin/utilities'

export type Settings = {
  count: number
}

export type CopyTextToClipboardProps = Settings

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: () => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (count: number) => void
}

export interface CopyTextToClipboardRequest extends EventHandler {
  name: 'COPY_TEXT_TO_CLIPBOARD_REQUEST'
  handler: (options: { count: number; text: string; html?: string }) => void
}
export interface CopyTextToClipboardSuccess extends EventHandler {
  name: 'COPY_TEXT_TO_CLIPBOARD_SUCCESS'
  handler: (count: number) => void
}
