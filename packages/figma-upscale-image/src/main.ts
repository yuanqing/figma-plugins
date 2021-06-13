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

import { getImageNodes } from './utilities/get-image-nodes.js'
import { readImageNodesAsync } from './utilities/read-image-nodes-async.js'
import { defaultSettings, settingsKey } from './utilities/settings.js'
import {
  CloseUIHandler,
  ImageNodePlainObject,
  SelectionChangedHandler,
  Settings,
  SubmitHandler,
  UpscaleImageProps,
  UpscaleImagesRequestHandler,
  UpscaleImagesResultHandler
} from './utilities/types.js'

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
    await saveSettingsAsync(settings, settingsKey)
    const { scale } = settings
    const imageNodePlainObjects = await readImageNodesAsync(getImageNodes())
    emit<UpscaleImagesRequestHandler>(
      'UPSCALE_IMAGES_REQUEST',
      imageNodePlainObjects,
      scale
    )
  })
  on<UpscaleImagesResultHandler>(
    'UPSCALE_IMAGES_RESULT',
    function (imageNodePlainObjects: Array<ImageNodePlainObject>) {
      for (const imageNodePlainObject of imageNodePlainObjects) {
        const node = figma.getNodeById(imageNodePlainObject.id) as RectangleNode
        node.resize(imageNodePlainObject.width, imageNodePlainObject.height)
        node.fills = [createImagePaint(imageNodePlainObject.bytes)]
      }
      figma.closePlugin(
        formatSuccessMessage(
          `Upscaled ${imageNodePlainObjects.length} ${pluralize(
            imageNodePlainObjects.length,
            'image'
          )}`
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
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  showUI<UpscaleImageProps>(
    { height: 129, width: 240 },
    { ...settings, hasSelection }
  )
}
