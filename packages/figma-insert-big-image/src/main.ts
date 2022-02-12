import {
  emit,
  formatSuccessMessage,
  loadSettingsAsync,
  on,
  once,
  pluralize,
  saveSettingsAsync,
  showUI,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { createImageNode } from './utilities/create-image-node.js'
import { defaultSettings, settingsKey } from './utilities/settings.js'
import {
  CloseUIHandler,
  DropImagesHandler,
  DroppedImage,
  ImageNodePlainObject,
  InsertBigImageHandler,
  InsertBigImageProps,
  SaveSettingsHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  let xOffset = Math.round(figma.viewport.center.x)
  let yOffset = Math.round(figma.viewport.center.y)
  const result: Array<SceneNode> = []
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  figma.on('drop', function (event: DropEvent): boolean {
    xOffset = event.absoluteX
    yOffset = event.absoluteY
    const promises: Array<Promise<Uint8Array>> = []
    for (const file of event.files) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        promises.push(file.getBytesAsync())
      }
    }
    if (promises.length === 0) {
      return true
    }
    Promise.all(promises).then(function (result: Array<Uint8Array>): void {
      const droppedImages: Array<DroppedImage> = result.map(function (
        bytes: Uint8Array,
        index: number
      ) {
        const file = event.files[index]
        return { bytes, name: file.name, type: file.type }
      })
      emit<DropImagesHandler>('DROP_IMAGES', droppedImages)
    })
    return false
  })
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  on<SaveSettingsHandler>(
    'SAVE_SETTINGS',
    async function (insertAs2x: boolean): Promise<void> {
      await saveSettingsAsync({ insertAs2x }, settingsKey)
    }
  )
  on<InsertBigImageHandler>(
    'INSERT_BIG_IMAGE',
    async function (
      imageNodePlainObjects: Array<ImageNodePlainObject>,
      options: { name: string; done: boolean }
    ) {
      const { name, done } = options
      const { insertAs2x } = await loadSettingsAsync(
        defaultSettings,
        settingsKey
      )
      const imageNodes: Array<RectangleNode> = []
      for (const imageNodePlainObject of imageNodePlainObjects) {
        const imageNode = createImageNode(imageNodePlainObject, {
          resolution: insertAs2x === true ? 2 : 1,
          xOffset,
          yOffset
        })
        imageNodes.push(imageNode)
      }
      if (imageNodes.length === 1) {
        imageNodes[0].name = name
        result.push(imageNodes[0])
        xOffset += imageNodes[0].width
      } else {
        updateNodesSortOrder(imageNodes)
        const group = figma.group(imageNodes, figma.currentPage)
        group.name = name
        result.push(group)
        xOffset += group.width
      }
      if (done === false) {
        return
      }
      updateNodesSortOrder(result)
      figma.currentPage.selection = result
      figma.viewport.scrollAndZoomIntoView(result)
      figma.closePlugin(
        formatSuccessMessage(
          `Inserted ${result.length} ${pluralize(result.length, 'image')}`
        )
      )
    }
  )
  showUI<InsertBigImageProps>({ height: 220, width: 240 }, settings)
}
