import { emit, once } from '@create-figma-plugin/utilities'

import {
  ReadClipboardStringRequest,
  ReadClipboardStringResult
} from './utilities/types.js'

export default function (): void {
  once<ReadClipboardStringRequest>(
    'READ_CLIPBOARD_STRING_REQUEST',
    function () {
      emit<ReadClipboardStringResult>(
        'READ_CLIPBOARD_STRING_RESULT',
        readClipboardContents()
      )
    }
  )
}

function readClipboardContents() {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)
  textareaElement.select()
  document.execCommand('paste')
  return textareaElement.value
}
