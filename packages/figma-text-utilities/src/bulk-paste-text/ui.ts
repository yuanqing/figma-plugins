import { emit, once } from '@create-figma-plugin/utilities'

export default function (): void {
  once('READ_CLIPBOARD_CONTENTS_REQUEST', function () {
    emit('READ_CLIPBOARD_CONTENTS_RESULT', readClipboardContents())
  })
}

function readClipboardContents() {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)
  textareaElement.select()
  document.execCommand('paste')
  return textareaElement.value
}
