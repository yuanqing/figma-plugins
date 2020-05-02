import {
  formatSuccessMessage,
  loadSettingsAsync,
  saveSettingsAsync,
  on,
  once,
  pluralize,
  showUI,
  updateLayersSortOrder
} from '@create-figma-plugin/utilities'
import { createImageLayer } from './utilities/create-image-layer'
import { defaultSettings } from './utilities/default-settings'

export default async function () {
  const center = figma.viewport.center
  let x = Math.round(center.x)
  const y = Math.round(center.y)
  const result = []
  const settings = await loadSettingsAsync(defaultSettings)
  on('INSERT_BIG_IMAGE', async function ({
    name,
    images,
    insertAs2x,
    width,
    isDone
  }) {
    saveSettingsAsync({ ...settings, insertAs2x })
    const imageLayers = []
    for (const image of images) {
      imageLayers.push(createImageLayer(image, x, y, insertAs2x))
    }
    x += insertAs2x === true ? width / 2 : width
    if (imageLayers.length === 1) {
      imageLayers[0].name = name
      result.push(imageLayers[0])
    } else {
      updateLayersSortOrder(imageLayers)
      const group = figma.group(imageLayers, figma.currentPage)
      group.name = name
      result.push(group)
    }
    if (isDone === false) {
      return
    }
    updateLayersSortOrder(result)
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
  showUI({ width: 240, height: 224 }, settings)
}
