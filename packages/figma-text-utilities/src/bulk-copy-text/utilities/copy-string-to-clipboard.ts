import { emit, once, showUI } from '@create-figma-plugin/utilities'

export function copyStringToClipboard(string: string): Promise<void> {
  return new Promise(function (resolve) {
    once('COPY_TEXT_SUCCESS', function () {
      figma.ui.close()
      resolve()
    })
    showUI({ height: 0, width: 0 })
    emit('COPY_TEXT_REQUEST', { string })
  })
}
