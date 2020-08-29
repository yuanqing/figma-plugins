import { emit, once } from '@create-figma-plugin/utilities'

export default function (): void {
  once('COPY_TEXT_REQUEST', async function ({ string }) {
    copyStringToClipboard(string)
    emit('COPY_TEXT_SUCCESS')
  })
}

function copyStringToClipboard(string: string): void {
  const textareaElement = document.createElement('textarea')
  document.body.appendChild(textareaElement)
  textareaElement.value = string
  textareaElement.select()
  document.execCommand('copy')
}
