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
  // Get the selected layers, and show an error message if no layers
  // were selected.
  const selectedLayers = figma.currentPage.selection.slice()
  if (selectedLayers.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }

  // Replace (with a clone) any layer nested within an instance in the
  // `selectedLayers` array, and hide any such layer.
  const layers = replaceLayersWithinInstancesWithClones(selectedLayers)

  // Create a group containing our selected layers.
  const group = createGroup(layers)

  // Get the saved `resolution` setting.
  const { resolution } = await loadSettingsAsync(defaultSettings)

  // Export the group as a high-resolution image, and create a new layer with
  // the exported image as a fill.
  const imageLayer = await createImageLayerFromGroupAsync(group, resolution)

  // Delete the group containing our original selected layers.
  group.remove()

  // Update the selection to our new `imageLayer`.
  figma.currentPage.selection = [imageLayer]

  // Show a success message.
  figma.closePlugin(
    formatSuccessMessage(`Flattened selection at ${resolution}x`)
  )
}
