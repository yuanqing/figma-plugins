/* global Blob */

import { emit, once } from '@create-figma-plugin/utilities'
import { splitImageAsync } from 'figma-insert-big-image/src/utilities/split-image-async'

export default async function (): Promise<void> {
  once('SPLIT_IMAGE_REQUEST', async function ({ bytes }) {
    const blob = new Blob([bytes])
    const images = await splitImageAsync(blob)
    emit('SPLIT_IMAGE_RESULT', { images })
  })
}
