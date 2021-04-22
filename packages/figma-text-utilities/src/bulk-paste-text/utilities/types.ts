import { EventHandler } from '@create-figma-plugin/utilities'

export interface ReadClipboardStringRequest extends EventHandler {
  name: 'READ_CLIPBOARD_STRING_REQUEST'
  handler: () => void
}
export interface ReadClipboardStringResult extends EventHandler {
  name: 'READ_CLIPBOARD_STRING_RESULT'
  handler: (string: string) => void
}
