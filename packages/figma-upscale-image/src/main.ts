import {
  emit,
  formatErrorMessage,
  loadSettingsAsync,
  on,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { Image } from './types'
import { createImageNode } from './utilities/create-image-node'
import { defaultSettings } from './utilities/default-settings'
import { getImageNodes } from './utilities/get-image-nodes'
import { readImagesAsync } from './utilities/read-images-async'

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
    const images = await readImagesAsync(getImageNodes())
    emit('UPSCALE_IMAGES', { images, scale })
  })
  const newSelection: Array<RectangleNode> = []
  on('UPSCALE_IMAGE_RESULT', function (image: Image) {
    const node = createImageNode(image)
    newSelection.push(node)
  })
  once('CLOSE_UI', function () {
    figma.currentPage.selection = newSelection
    figma.closePlugin()
  })
  const settings = await loadSettingsAsync(defaultSettings)
  showUI({ height: 136, width: 240 }, { ...settings, hasSelection })
}
