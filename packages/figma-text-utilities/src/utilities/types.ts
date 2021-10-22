import { EventHandler } from '@create-figma-plugin/utilities'

export interface CopyTextToClipboardRequest extends EventHandler {
  name: 'COPY_TEXT_TO_CLIPBOARD_REQUEST'
  handler: (string: string) => void
}
export interface CopyTextToClipboardResult extends EventHandler {
  name: 'COPY_TEXT_TO_CLIPBOARD_RESULT'
  handler: () => void
}
