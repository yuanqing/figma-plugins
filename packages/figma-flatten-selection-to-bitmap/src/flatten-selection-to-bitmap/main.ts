import {
  formatErrorMessage,
  formatSuccessMessage,
  formatWarningMessage,
  loadSettingsAsync
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { createGroupNode } from './utilities/create-group'
import { flattenGroupNodeAsync } from './utilities/flatten-group-node-async'
import { replaceNodesWithinInstancesWithClones } from './utilities/replace-nodes-within-instances-with-clones'

export default async function (): Promise<void> {
  const length = figma.currentPage.selection.length
  if (length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }
  const layerName = length === 1 ? figma.currentPage.selection[0].name : 'Image'
  const nodes = replaceNodesWithinInstancesWithClones(
    figma.currentPage.selection.slice()
  )
  const group = createGroupNode(nodes)
  const { resolution } = await loadSettingsAsync(defaultSettings)
  const node = await flattenGroupNodeAsync(group, resolution)
  const didPositionChange =
    node.width !== group.width || node.height !== group.height
  group.remove()
  node.name = layerName
  figma.currentPage.selection = [node]
  figma.closePlugin(
    didPositionChange === true
      ? formatWarningMessage(
          `Flattened at ${resolution}x; position on canvas may have changed`
        )
      : formatSuccessMessage(`Flattened at ${resolution}x`)
  )
}
