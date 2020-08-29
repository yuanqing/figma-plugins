import { emit, once, showUI } from '@create-figma-plugin/utilities'

export function readClipboardContents(): Promise<string> {
  return new Promise(function (resolve) {
    once('READ_CLIPBOARD_CONTENTS_RESULT', function (text: string) {
      figma.ui.close()
      resolve(text)
    })
    showUI({ height: 0, width: 0 })
    emit('READ_CLIPBOARD_CONTENTS_REQUEST')
  })
}
