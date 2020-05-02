import {
  computeSiblingLayers,
  formatErrorMessage,
  formatSuccessMessage,
  isLayerWithinInstance,
  loadSettingsAsync
} from '@create-figma-plugin/utilities'
import { rasterizeLayersAsync } from './utilities/rasterize-layers-async'
import { defaultSettings } from '../utilities/default-settings'

export default async function () {
  const selection = figma.currentPage.selection
  if (selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const groups = computeSiblingLayers(selection)
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
  const { resolution } = await loadSettingsAsync(defaultSettings)
  const layer = await rasterizeLayersAsync(layers, resolution)
  figma.currentPage.selection = [layer]
  figma.closePlugin(
    formatSuccessMessage(`Flattened to bitmap at ${resolution}x`)
  )
}
