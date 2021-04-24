import { emit, once } from '@create-figma-plugin/utilities'

import {
  CopyStringToClipboardRequest,
  CopyStringToClipboardResult
} from './utilities/types'

export default function (): void {
  once<CopyStringToClipboardRequest>(
    'COPY_STRING_TO_CLIPBOARD_REQUEST',
    function (string: string) {
      copyTextToClipboard(string)
      emit<CopyStringToClipboardResult>('COPY_STRING_TO_CLIPBOARD_RESULT')
    }
  )
}

function copyTextToClipboard(string: string): void {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)
  textareaElement.value = string
  textareaElement.select()
  document.execCommand('copy')
}
