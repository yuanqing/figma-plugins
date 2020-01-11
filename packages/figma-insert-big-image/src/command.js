import {
  addEventListener,
  formatSuccessMessage,
  showUI
} from '@create-figma-plugin/utilities'
import { createImageLayer } from './utilities/create-image-layer'

export default async function () {
  addEventListener('SUBMIT', async function ({ name, images }) {
    const imageLayers = []
    for (const image of images) {
      imageLayers.push(createImageLayer(image))
    }
    const group = figma.group(imageLayers, figma.currentPage)
    group.name = name
    const selection = [group]
    figma.currentPage.selection = selection
    figma.viewport.scrollAndZoomIntoView(selection)
    figma.closePlugin(formatSuccessMessage('Inserted image'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 240 })
}
