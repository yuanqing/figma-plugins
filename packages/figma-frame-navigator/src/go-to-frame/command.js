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
import { getAllTopLevelFrames } from '../utilities/get-all-top-level-frames'

export default function () {
  const frames = getFrames()
  if (frames.length === 0) {
    figma.closePlugin(formatErrorMessage('No top-level frames on page'))
    return
  }
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', {
      frames: getFrames()
    })
  })
  addEventListener('SUBMIT', function ({ selectedFrameId }) {
    const frame = figma.getNodeById(selectedFrameId)
    figma.viewport.scrollAndZoomIntoView([frame])
    figma.currentPage.selection = [frame]
    figma.closePlugin(formatSuccessMessage(`Navigated to “${frame.name}”`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 308 }, { frames })
}

function getFrames () {
  const frames = sortLayersByName(getAllTopLevelFrames())
  return extractLayerAttributes(frames, ['id', 'name'])
}
