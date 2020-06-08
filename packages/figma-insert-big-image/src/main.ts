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

export default async function (): Promise<void> {
  const center = figma.viewport.center
  let xOffset = Math.round(center.x)
  const yOffset = Math.round(center.y)
  const result: Array<SceneNode> = []
  const settings = await loadSettingsAsync(defaultSettings)
  on('INSERT_BIG_IMAGE', async function ({
    name,
    images,
    insertAs2x,
    width,
    isDone
  }) {
    saveSettingsAsync({ ...settings, insertAs2x })
    const imageNodes = []
    for (const image of images) {
      imageNodes.push(createImageNode(image, xOffset, yOffset, insertAs2x))
    }
    xOffset += insertAs2x === true ? width / 2 : width
    if (imageNodes.length === 1) {
      imageNodes[0].name = name
      result.push(imageNodes[0])
    } else {
      updateNodesSortOrder(imageNodes)
      const group = figma.group(imageNodes, figma.currentPage)
      group.name = name
      result.push(group)
    }
    if (isDone === false) {
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
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI({ height: 224, width: 240 }, settings)
}
