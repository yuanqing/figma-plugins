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

import { defaultSettings } from './utilities/default-settings'
import { getImageNodes } from './utilities/get-image-nodes'
import { readImageNodesAsync } from './utilities/read-image-nodes-async'
import {
  CloseUIHandler,
  ImageNodeAttributes,
  SelectionChangedHandler,
  Settings,
  SubmitHandler,
  UpscaleImageProps,
  UpscaleImagesRequestHandler,
  UpscaleImagesResultHandler
} from './utilities/types'

export default async function (): Promise<void> {
  const hasSelection = getImageNodes().length > 0
  if (hasSelection === false) {
    figma.closePlugin(formatErrorMessage('Select one or more image layers'))
    return
  }
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings)
    const { scale } = settings
    const images = await readImageNodesAsync(getImageNodes())
    emit<UpscaleImagesRequestHandler>('UPSCALE_IMAGES_REQUEST', images, scale)
  })
  on<UpscaleImagesResultHandler>(
    'UPSCALE_IMAGES_RESULT',
    function (images: Array<ImageNodeAttributes>) {
      for (const image of images) {
        const node = figma.getNodeById(image.id) as RectangleNode
        node.resize(image.width, image.height)
        node.fills = [createImagePaint(image.bytes)]
      }
      figma.closePlugin(
        formatSuccessMessage(
          `Upscaled ${images.length} ${pluralize(images.length, 'image')}`
        )
      )
    }
  )
  figma.on('selectionchange', function () {
    emit<SelectionChangedHandler>(
      'SELECTION_CHANGED',
      getImageNodes().length > 0
    )
  })
  const settings = await loadSettingsAsync(defaultSettings)
  showUI<UpscaleImageProps>(
    { height: 136, width: 240 },
    { ...settings, hasSelection }
  )
}
