import { EventHandler } from '@create-figma-plugin/utilities'

export interface CopyStringToClipboardRequest extends EventHandler {
  name: 'COPY_STRING_TO_CLIPBOARD_REQUEST'
  handler: (string: string) => void
}
export interface CopyStringToClipboardResult extends EventHandler {
  name: 'COPY_STRING_TO_CLIPBOARD_RESULT'
  handler: () => void
}
