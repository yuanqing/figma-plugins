import {
  LoadingIndicator,
  MiddleAlign,
  Text,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, once } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  CopyTextToClipboardRequest,
  CopyTextToClipboardResult
} from '../utilities/types.js'
import styles from './copy-text-to-clipboard.css'

const UI_MINIMUM_VISIBLE_TIME = 500

export function CopyTextToClipboard(): JSX.Element {
  useEffect(function () {
    once<CopyTextToClipboardRequest>(
      'COPY_TEXT_TO_CLIPBOARD_REQUEST',
      async function (text: string) {
        const startTimestamp = Date.now()
        copyTextToClipboard(text)
        const elapsedTime = Date.now() - startTimestamp
        if (elapsedTime >= UI_MINIMUM_VISIBLE_TIME) {
          emit<CopyTextToClipboardResult>('COPY_TEXT_TO_CLIPBOARD_RESULT')
          return
        }
        setTimeout(function () {
          emit<CopyTextToClipboardResult>('COPY_TEXT_TO_CLIPBOARD_RESULT')
        }, UI_MINIMUM_VISIBLE_TIME - elapsedTime)
      }
    )
  }, [])
  return (
    <div class={styles.copyTextToClipboard}>
      <MiddleAlign>
        <LoadingIndicator color="blue" />
        <VerticalSpace space="extraSmall" />
        <Text align="center">Copying text…</Text>
      </MiddleAlign>
    </div>
  )
}

function copyTextToClipboard(string: string): void {
  const textareaElement = document.createElement('textarea')
  textareaElement.style.cssText = 'position: fixed; top: 100%; left: 100%;'
  document.body.appendChild(textareaElement)
  textareaElement.value = string
  textareaElement.select()
  document.execCommand('copy')
}
