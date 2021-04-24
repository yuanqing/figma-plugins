import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  formatWarningMessage,
  insertBeforeNode,
  loadSettingsAsync,
  once,
  showUI,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'
import { createImageNode } from 'figma-insert-big-image/src/utilities/create-image-node'
import { ImageAttributes } from 'figma-insert-big-image/src/utilities/types'

import { defaultSettings } from '../utilities/default-settings'
import { createGroupNode } from './utilities/create-group-node'
import { exportNodeAsync } from './utilities/export-node-async'
import { replaceNodesWithinInstancesWithClones } from './utilities/replace-nodes-within-instances-with-clones'
import {
  SplitImageRequestHandler,
  SplitImageResultHandler
} from './utilities/types'

export default async function (): Promise<void> {
  if (figma.currentPage.selection.length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more layers'))
    return
  }

  const { resolution } = await loadSettingsAsync(defaultSettings)

  const nodes = replaceNodesWithinInstancesWithClones(
    figma.currentPage.selection.slice()
  )
  const temporaryGroupNode = createGroupNode(nodes)

  once<SplitImageResultHandler>(
    'SPLIT_IMAGE_RESULT',
    function (images: Array<ImageAttributes>) {
      const result: Array<RectangleNode> = []
      for (const image of images) {
        const node = createImageNode(image, {
          resolution,
          xOffset: temporaryGroupNode.x,
          yOffset: temporaryGroupNode.y
        })
        insertBeforeNode(node, temporaryGroupNode)
        result.push(node)
      }
      let node: SceneNode
      if (result.length === 1) {
        node = result[0]
      } else {
        updateNodesSortOrder(result)
        node = createGroupNode(result)
        node.name = 'Image'
      }
      const didPositionChange =
        node.width !== temporaryGroupNode.width ||
        node.height !== temporaryGroupNode.height
      temporaryGroupNode.remove()
      figma.currentPage.selection = [node]
      figma.closePlugin(
        didPositionChange === true
          ? formatWarningMessage(
              `Flattened at ${resolution}x; position on canvas may have changed`
            )
          : formatSuccessMessage(`Flattened at ${resolution}x`)
      )
    }
  )

  showUI({
    height: 136,
    width: 240
  })

  const bytes = await exportNodeAsync(temporaryGroupNode, resolution)
  emit<SplitImageRequestHandler>('SPLIT_IMAGE_REQUEST', bytes)
}
