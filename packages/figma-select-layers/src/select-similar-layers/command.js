/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage,
  mapNumberToWord,
  pluralize
} from '@create-figma-plugin/utilities'
import { getSimilarLayers } from './get-similar-layers'

export default function () {
  const length = figma.currentPage.selection.length
  if (length !== 1) {
    figma.closePlugin(
      formatErrorMessage(
        length === 0
          ? 'Select one reference layer'
          : 'Select only one reference layer'
      )
    )
    return
  }
  const referenceLayer = figma.currentPage.selection[0]
  const layers = getSimilarLayers(referenceLayer)
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage('No similar layers on page'))
    return
  }
  const selection = [referenceLayer, ...layers]
  figma.currentPage.selection = selection
  figma.viewport.scrollAndZoomIntoView(selection)
  figma.closePlugin(
    formatSuccessMessage(
      `Selected ${mapNumberToWord(layers.length)} ${pluralize(
        layers.length,
        'similar layer'
      )}`
    )
  )
}
