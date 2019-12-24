/* global figma */
import {
  addEventListener,
  extractLayerAttributes,
  formatErrorMessage,
  formatSuccessMessage,
  onSelectionChange,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { sortLayersByName } from 'figma-sort-layers/src/sort-layers-by-name'
import { getAllTopLevelLayers } from '../utilities/get-all-top-level-layers'
import { getSelectedTopLevelLayers } from '../utilities/get-selected-top-level-layers'

export default function () {
  const layers = getLayers()
  if (layers.length === 0) {
    figma.closePlugin(
      formatErrorMessage('No top-level frames/components on page')
    )
    return
  }
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      layers: getLayers()
    })
  })
  addEventListener('SUBMIT', function ({ selectedLayerId }) {
    const layer = figma.getNodeById(selectedLayerId)
    figma.viewport.scrollAndZoomIntoView([layer])
    figma.currentPage.selection = [layer]
    figma.closePlugin(formatSuccessMessage(`Jumped to “${layer.name}”`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 308 },
    { layers, selectedLayerId: getSelectedLayerId() }
  )
}

function getLayers () {
  const layers = sortLayersByName(getAllTopLevelLayers())
  return extractLayerAttributes(layers, ['id', 'name', 'type'])
}

function getSelectedLayerId () {
  const selectedLayers = getSelectedTopLevelLayers()
  return selectedLayers.length === 1 ? selectedLayers[0].id : null
}
