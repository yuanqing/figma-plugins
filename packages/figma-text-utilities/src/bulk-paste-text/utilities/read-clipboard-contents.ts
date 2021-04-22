import { emit, once, showUI } from '@create-figma-plugin/utilities'

import { ReadClipboardStringRequest, ReadClipboardStringResult } from './types'

export function readClipboardContents(): Promise<string> {
  return new Promise(function (resolve) {
    once<ReadClipboardStringResult>(
      'READ_CLIPBOARD_STRING_RESULT',
      function (string: string) {
        figma.ui.close()
        resolve(string)
      }
    )
    showUI({ height: 0, width: 0 })
    emit<ReadClipboardStringRequest>('READ_CLIPBOARD_STRING_REQUEST')
  })
}
