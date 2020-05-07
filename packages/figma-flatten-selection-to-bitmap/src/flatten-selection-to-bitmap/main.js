import {
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync
} from '@create-figma-plugin/utilities'
import { createGroup } from './utilities/create-group'
import { createImageLayerFromGroupAsync } from './utilities/create-image-layer-from-group-async'
import { defaultSettings } from '../utilities/default-settings'
import { replaceLayersWithinInstancesWithClones } from './utilities/replace-layers-within-instances-with-clones'

export default async function () {
  const selectedLayers = figma.currentPage.selection.slice()
  if (selectedLayers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const layers = replaceLayersWithinInstancesWithClones(selectedLayers)
  const group = createGroup(layers)
  const { resolution } = await loadSettingsAsync(defaultSettings)
  const imageLayer = await createImageLayerFromGroupAsync(group, resolution)
  group.remove()
  figma.currentPage.selection = [imageLayer]
  figma.closePlugin(
    formatSuccessMessage(`Flattened selection at ${resolution}x`)
  )
}
