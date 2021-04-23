import {
  emit,
  once,
  showUI,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'
import { createImageNode } from 'figma-insert-big-image/src/utilities/create-image-node'
import { ImageAttributes } from 'figma-insert-big-image/src/utilities/types'

import { Settings } from '../../utilities/types'
import { SplitImageRequestHandler, SplitImageResultHandler } from './types'

export async function flattenGroupNodeAsync(
  group: GroupNode,
  resolution: Exclude<Settings['resolution'], null>
): Promise<RectangleNode | GroupNode> {
  const exportSettings: ExportSettingsImage = {
    constraint: {
      type: 'SCALE',
      value: resolution
    },
    format: 'PNG'
  }
  const bytes = await group.exportAsync(exportSettings)
  const images = await splitImageAsync(bytes)
  const result: Array<RectangleNode> = []
  for (const image of images) {
    result.push(
      createImageNode(image, { resolution, xOffset: group.x, yOffset: group.y })
    )
  }
  if (result.length === 1) {
    return result[0]
  }
  updateNodesSortOrder(result)
  return figma.group(result, figma.currentPage)
}

async function splitImageAsync(
  bytes: Uint8Array
): Promise<Array<ImageAttributes>> {
  return new Promise(function (resolve) {
    once<SplitImageResultHandler>(
      'SPLIT_IMAGE_RESULT',
      function (images: Array<ImageAttributes>) {
        figma.ui.close()
        resolve(images)
      }
    )
    showUI({ visible: false })
    emit<SplitImageRequestHandler>('SPLIT_IMAGE_REQUEST', bytes)
  })
}
