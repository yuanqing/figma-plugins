import {
  formatErrorMessage,
  formatSuccessMessage,
  formatWarningMessage,
  loadSettingsAsync
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { createGroup } from './utilities/create-group'
import { createImageLayerFromGroupAsync } from './utilities/create-image-layer-from-group-async'
import { replaceLayersWithinInstancesWithClones } from './utilities/replace-layers-within-instances-with-clones'

export default async function() {
  const selectedLayers = figma.currentPage.selection.slice()
  if (selectedLayers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const layers = replaceLayersWithinInstancesWithClones(selectedLayers)
  const group = createGroup(layers)
  const { resolution } = await loadSettingsAsync(defaultSettings)
  const imageLayer = await createImageLayerFromGroupAsync(group, resolution)
  const didPositionChange =
    imageLayer.width !== group.width || imageLayer.height !== group.height
  group.remove()
  figma.currentPage.selection = [imageLayer]
  figma.closePlugin(
    didPositionChange === true
      ? formatWarningMessage(
          `Flattened at ${resolution}x; position on canvas may have changed`
        )
      : formatSuccessMessage(`Flattened at ${resolution}x`)
  )
}
