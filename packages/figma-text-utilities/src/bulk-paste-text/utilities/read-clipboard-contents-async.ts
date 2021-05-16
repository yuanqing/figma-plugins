import { emit, once, showUI } from '@create-figma-plugin/utilities'

import {
  ReadClipboardStringRequest,
  ReadClipboardStringResult
} from './types.js'

export async function readClipboardContentsAsync(): Promise<string> {
  return new Promise(function (resolve) {
    once<ReadClipboardStringResult>(
      'READ_CLIPBOARD_STRING_RESULT',
      function (string: string) {
        figma.ui.close()
        resolve(string)
      }
    )
    // can't use `visible: false` because the UI must be visible for copying to work
    showUI({ height: 0, width: 0 })
    emit<ReadClipboardStringRequest>('READ_CLIPBOARD_STRING_REQUEST')
  })
}
