import {
  formatErrorMessage,
  formatSuccessMessage,
  groupSiblingLayers,
  isLayerWithinInstance,
  mapNumberToWord,
  pluralize
} from '@create-figma-plugin/utilities'
import { rasterizeLayersAsync } from './utilities/rasterize-layers-async'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const groups = groupSiblingLayers(selection)
  if (groups.length > 1) {
    figma.closePlugin(
      formatErrorMessage('Select sibling layers at the same hierarchy')
    )
    return
  }
  const layers = groups[0]
  if (isLayerWithinInstance(layers[0]) === true) {
    figma.closePlugin(
      formatErrorMessage('Select layers outside instance layers')
    )
    return
  }
  const layer = await rasterizeLayersAsync(layers)
  figma.currentPage.selection = [layer]
  figma.closePlugin(
    formatSuccessMessage(
      `Rasterized ${mapNumberToWord(layers.length)} ${pluralize(
        layers.length,
        'selected layer'
      )} at 2x`
    )
  )
}
