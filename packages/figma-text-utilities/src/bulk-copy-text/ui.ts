import { emit, once } from '@create-figma-plugin/utilities'

export default function (): void {
  once('COPY_TEXT', async function ({ text }) {
    copyStringToClipboard(text)
    emit('COPY_TEXT_SUCCESS')
  })
}

function copyStringToClipboard(string: string) {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)
  textareaElement.value = string
  textareaElement.select()
  document.execCommand('copy')
}
