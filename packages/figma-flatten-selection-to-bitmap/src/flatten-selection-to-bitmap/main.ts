import {
  formatErrorMessage,
  formatSuccessMessage,
  formatWarningMessage,
  loadSettingsAsync
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { createGroup } from './utilities/create-group'
import { createImageFromGroupAsync } from './utilities/create-image-from-group-async'
import { replaceNodesWithinInstancesWithClones } from './utilities/replace-nodes-within-instances-with-clones'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const nodes = replaceNodesWithinInstancesWithClones(
    figma.currentPage.selection.slice()
  )
  const group = createGroup(nodes)
  const { resolution } = await loadSettingsAsync(defaultSettings)
  const image = await createImageFromGroupAsync(group, resolution)
  const didPositionChange =
    image.width !== group.width || image.height !== group.height
  group.remove()
  figma.currentPage.selection = [image]
  figma.closePlugin(
    didPositionChange === true
      ? formatWarningMessage(
          `Flattened at ${resolution}x; position on canvas may have changed`
        )
      : formatSuccessMessage(`Flattened at ${resolution}x`)
  )
}
