/* global Blob */
import { emit, once } from '@create-figma-plugin/utilities'
import { splitImageAsync } from 'figma-insert-big-image/src/utilities/split-image-async'

import {
  SplitImageRequestHandler,
  SplitImageResultHandler
} from './utilities/types'

export default async function (): Promise<void> {
  once<SplitImageRequestHandler>(
    'SPLIT_IMAGE_REQUEST',
    async function (bytes: Uint8Array) {
      const blob = new Blob([bytes])
      const images = await splitImageAsync(blob)
      emit<SplitImageResultHandler>('SPLIT_IMAGE_RESULT', images)
    }
  )
}
