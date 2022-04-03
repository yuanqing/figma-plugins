import {
  formatErrorMessage,
  formatSuccessMessage
} from '@create-figma-plugin/utilities'

import { deleteLinks } from '../utilities/delete-links.js'
import { getVisibleTopLevelFrameNodes } from '../utilities/get-visible-top-level-frame-nodes.js'

export default async function (): Promise<void> {
  const nodes = getVisibleTopLevelFrameNodes()
  if (nodes.length === 0) {
    figma.closePlugin(formatErrorMessage('No frames on page'))
    return
  }
  deleteLinks(nodes)
  figma.currentPage.flowStartingPoints = []
  figma.closePlugin(formatSuccessMessage('Deleted links'))
}
