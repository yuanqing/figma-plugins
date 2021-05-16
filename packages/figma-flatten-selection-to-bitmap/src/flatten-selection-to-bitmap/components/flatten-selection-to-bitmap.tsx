import {
  LoadingIndicator,
  MiddleAlign,
  Text,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, once } from '@create-figma-plugin/utilities'
import { splitImageAsync } from 'figma-insert-big-image/src/utilities/split-image-async'
import { h, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

import {
  SplitImageRequestHandler,
  SplitImageResultHandler
} from '../utilities/types.js'

const UI_MINIMUM_VISIBLE_TIME = 800

export function FlattenSelectionToBitmap(): JSX.Element {
  useEffect(function () {
    once<SplitImageRequestHandler>(
      'SPLIT_IMAGE_REQUEST',
      async function (bytes: Uint8Array) {
        const startTimestamp = Date.now()
        const blob = new Blob([bytes])
        const images = await splitImageAsync(blob)
        const elapsedTime = Date.now() - startTimestamp
        if (elapsedTime >= UI_MINIMUM_VISIBLE_TIME) {
          emit<SplitImageResultHandler>('SPLIT_IMAGE_RESULT', images)
          return
        }
        setTimeout(function () {
          emit<SplitImageResultHandler>('SPLIT_IMAGE_RESULT', images)
        }, UI_MINIMUM_VISIBLE_TIME - elapsedTime)
      }
    )
  }, [])
  return (
    <MiddleAlign>
      <LoadingIndicator color="blue" />
      <VerticalSpace space="small" />
      <Text align="center">Flattening selection…</Text>
      <VerticalSpace space="medium" /> {/* To optically middle-align things */}
    </MiddleAlign>
  )
}
