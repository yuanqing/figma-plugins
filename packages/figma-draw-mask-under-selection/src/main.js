import {
  formatErrorMessage,
  formatSuccessMessage,
  computeSiblingNodes,
  isLayerWithinInstance,
  pluralize
} from '@create-figma-plugin/utilities'
import { createMaskGroup } from './utilities/create-mask-group'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const groups = computeSiblingNodes(selection)
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
  const mask = createMaskGroup(layers) // `createMaskGroup` returns the `mask`
  figma.currentPage.selection = [mask]
  figma.closePlugin(
    formatSuccessMessage(
      `Drew mask under ${layers.length} ${pluralize(
        layers.length,
        'selected layer'
      )}`
    )
  )
}
