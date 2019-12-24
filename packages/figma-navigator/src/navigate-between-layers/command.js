/* global figma */
import {
  formatErrorMessage,
  loadSettings
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { getAllLayers } from '../utilities/get-all-layers'
import { getSelectedLayers } from '../utilities/get-selected-layers'

export const previous = commandFactory(1, 'At first component/frame on page')
export const next = commandFactory(-1, 'At last component/frame on page')

function commandFactory (indexOffset, noMoreLayersMessage) {
  return async function () {
    const settings = await loadSettings(defaultSettings)
    const { loop } = settings
    if (figma.currentPage.selection.length === 0) {
      figma.closePlugin(formatErrorMessage('Select a component/frame'))
      return
    }
    const selectedLayers = getSelectedLayers()
    if (selectedLayers.length > 1) {
      figma.closePlugin(formatErrorMessage('Select only one component/frame'))
      return
    }
    const selectedLayer = selectedLayers[0]
    const layers = getAllLayers()
    if (layers.length === 1) {
      figma.viewport.scrollAndZoomIntoView(layers)
      figma.closePlugin(formatErrorMessage('No other component/frames on page'))
      return
    }
    const nextLayer = getNextLayer(layers, selectedLayer, indexOffset, loop)
    if (nextLayer === null) {
      figma.viewport.scrollAndZoomIntoView([selectedLayer])
      figma.closePlugin(noMoreLayersMessage)
      return
    }
    figma.viewport.scrollAndZoomIntoView([nextLayer])
    figma.currentPage.selection = [nextLayer]
    figma.closePlugin()
  }
}

function getNextLayer (layers, currentLayer, indexOffset, loop) {
  const currentIndex = layers.indexOf(currentLayer)
  const nextIndex = currentIndex + indexOffset
  if (nextIndex === -1) {
    return loop === true ? layers[layers.length - 1] : null
  }
  if (nextIndex === layers.length) {
    return loop === true ? layers[0] : null
  }
  return layers[nextIndex]
}
