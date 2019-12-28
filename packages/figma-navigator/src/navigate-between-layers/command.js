import {
  formatErrorMessage,
  loadSettings
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'
import { getSelectedLayers } from '../utilities/get-selected-layers'
import { navigateToLayer } from '../utilities/navigate-to-layer'
import { getLayers } from './get-layers'
import { getNextLayer } from './get-next-layer'

export const previous = commandFactory(
  -1,
  'At first component/frame of document'
)
export const next = commandFactory(1, 'At last component/frame of document')

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
    const layers = getLayers()
    if (layers.length === 1) {
      navigateToLayer(layers[0])
      figma.closePlugin(
        formatErrorMessage('No other component/frames in document')
      )
      return
    }
    const nextLayer = getNextLayer(layers, selectedLayer, indexOffset, loop)
    if (nextLayer === null) {
      navigateToLayer(selectedLayer)
      figma.closePlugin(noMoreLayersMessage)
      return
    }
    navigateToLayer(nextLayer)
    figma.currentPage.selection = [nextLayer]
    figma.closePlugin()
  }
}
