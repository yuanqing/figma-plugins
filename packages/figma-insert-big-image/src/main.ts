import {
  formatSuccessMessage,
  loadSettingsAsync,
  on,
  once,
  pluralize,
  saveSettingsAsync,
  showUI,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { createImageNode } from './utilities/create-image-node'
import { defaultSettings } from './utilities/default-settings'
import {
  CloseUIHandler,
  ImageAttributes,
  InsertBigImageHandler,
  Settings
} from './utilities/types'

export default async function (): Promise<void> {
  let xOffset = Math.round(figma.viewport.center.x)
  const yOffset = Math.round(figma.viewport.center.y)
  const result: Array<SceneNode> = []
  const settings = await loadSettingsAsync(defaultSettings)
  on<InsertBigImageHandler>(
    'INSERT_BIG_IMAGE',
    async function (
      images: Array<ImageAttributes>,
      options: { name: string; insertAs2x: boolean; done: boolean }
    ) {
      const { name, insertAs2x, done } = options
      await saveSettingsAsync({ insertAs2x })
      const imageNodes: Array<RectangleNode> = []
      for (const image of images) {
        const imageNode = createImageNode(image, {
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
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI<Settings>({ height: 224, width: 240 }, settings)
}
