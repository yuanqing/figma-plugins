/* global figma */
import {
  addEventListener,
  extractLayerAttributes,
  formatErrorMessage,
  loadSettings,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { HEIGHT, WIDTH } from '../constants'
import { defaultSettings } from '../default-settings'

export default async function () {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const settings = await loadSettings(defaultSettings)
  addEventListener('SET_DIMENSION', async function ({ attribute, dimension }) {
    await saveSettings({
      ...settings,
      attribute
    })
    const layers = figma.currentPage.selection
    for (const layer of layers) {
      if (attribute === WIDTH) {
        layer.resize(dimension, layer.height)
      } else {
        layer.resize(layer.width, dimension)
      }
    }
    triggerEvent('SELECTION_CHANGED', getLayers())
  })
  figma.on('selectionchange', function () {
    triggerEvent('SELECTION_CHANGED', getLayers())
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 501 },
    { attribute: settings.attribute, layers: getLayers() }
  )
}

function getLayers () {
  return extractLayerAttributes(figma.currentPage.selection, [WIDTH, HEIGHT])
}
