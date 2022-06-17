import {
  Button,
  Container,
  Muted,
  Text,
  useInitialFocus,
  useWindowKeyDown,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on, pluralize } from '@create-figma-plugin/utilities'
import { h, JSX } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'

import {
  CloseUIHandler,
  CopyTextToClipboardProps,
  CopyTextToClipboardRequest,
  CopyTextToClipboardSuccess,
  SelectionChangedHandler,
  SubmitHandler
} from '../utilities/types.js'

export function copyTextToClipboardFactory(options: {
  copyButtonLabel: string
}) {
  const { copyButtonLabel } = options
  return function CopyTextToClipboard(
    props: CopyTextToClipboardProps
  ): JSX.Element {
    const [count, setCount] = useState<number>(props.count)
    useWindowKeyDown('Escape', function () {
      emit<CloseUIHandler>('CLOSE_UI')
    })
    useEffect(function () {
      return on<SelectionChangedHandler>(
        'SELECTION_CHANGED',
        function (count: number) {
          setCount(count)
        }
      )
    }, [])
    useEffect(function () {
      return on<CopyTextToClipboardRequest>(
        'COPY_TEXT_TO_CLIPBOARD_REQUEST',
        function (options: { count: number; html?: string; text: string }) {
          const { count, html, text } = options
          function handleCopy(event: ClipboardEvent): void {
            if (text === null) {
              return
            }
            if (event.clipboardData === null) {
              throw new Error('`event.clipboardData` is `null`')
            }
            event.preventDefault()
            if (typeof html !== 'undefined' && html !== null) {
              event.clipboardData.setData('text/html', html)
            }
            event.clipboardData.setData('text/plain', text)
          }
          document.addEventListener('copy', handleCopy)
          document.execCommand('copy')
          emit<CopyTextToClipboardSuccess>(
            'COPY_TEXT_TO_CLIPBOARD_SUCCESS',
            count
          )
        }
      )
    }, [])
    const handleButtonClick = useCallback(
      function () {
        if (count === 0) {
          return
        }
        emit<SubmitHandler>('SUBMIT')
      },
      [count]
    )
    return (
      <Container space="medium">
        <VerticalSpace space="extraLarge" />
        <Button
          {...useInitialFocus()}
          disabled={count === 0}
          fullWidth
          onClick={handleButtonClick}
        >
          {copyButtonLabel}
        </Button>
        <VerticalSpace space="small" />
        <Text align="center">
          <Muted>
            {count === 0
              ? 'Select at least 1 text layer'
              : `${count} ${pluralize(count, 'text layer')} in selection`}
          </Muted>
        </Text>
        <VerticalSpace space="extraLarge" />
      </Container>
    )
  }
}
