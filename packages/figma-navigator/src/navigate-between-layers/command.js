/* global figma */
import {
  formatErrorMessage,
  loadSettings
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { getAllTopLevelLayers } from '../utilities/get-all-top-level-layers'
import { getSelectedTopLevelLayers } from '../utilities/get-selected-top-level-layers'

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
    const selectedLayers = getSelectedTopLevelLayers()
    if (selectedLayers.length > 1) {
      figma.closePlugin(formatErrorMessage('Select only one component/frame'))
      return
    }
    const layers = getAllTopLevelLayers()
    if (layers.length === 1) {
      figma.viewport.scrollAndZoomIntoView(layers)
      figma.closePlugin(formatErrorMessage('No other component/frames on page'))
      return
    }
    const nextLayer = getNextLayer(selectedLayers[0], indexOffset, loop)
    if (nextLayer === null) {
      figma.viewport.scrollAndZoomIntoView(selectedLayers)
      figma.closePlugin(noMoreLayersMessage)
      return
    }
    figma.viewport.scrollAndZoomIntoView([nextLayer])
    figma.currentPage.selection = [nextLayer]
    figma.closePlugin()
  }
}

function getNextLayer (currentLayer, indexOffset, loop) {
  const layers = getAllTopLevelLayers()
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
