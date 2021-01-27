import {
  createImagePaint,
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  on,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { Image } from './types'
import { defaultSettings } from './utilities/default-settings'
import { getImageNodes } from './utilities/get-image-nodes'
import { readImageNodesAsync } from './utilities/read-image-nodes-async'

export default async function (): Promise<void> {
  const hasSelection = getImageNodes().length > 0
  if (hasSelection === false) {
    figma.closePlugin(formatErrorMessage('Select one or more image layers'))
    return
  }
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      hasSelection: getImageNodes().length > 0
    })
  })
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    const { scale } = settings
    const images = await readImageNodesAsync(getImageNodes())
    emit('UPSCALE_IMAGES', { images, scale })
  })
  on('UPSCALE_IMAGE_RESULT', function (image: Image) {
    const node = figma.getNodeById(image.id) as RectangleNode
    node.resize(image.width, image.height)
    node.fills = [createImagePaint(image.bytes)]
  })
  once('UPSCALE_IMAGES_SUCCESS', function ({ count }: { count: number }) {
    figma.closePlugin(
      formatSuccessMessage(`Upscaled ${count} ${pluralize(count, 'image')}`)
    )
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const settings = await loadSettingsAsync(defaultSettings)
  showUI({ height: 136, width: 240 }, { ...settings, hasSelection })
}
