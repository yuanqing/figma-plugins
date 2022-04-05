import {
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  pluralize,
  setRelaunchButton,
  updateNodesSortOrder
} from '@create-figma-plugin/utilities'

import { deleteLinks } from '../utilities/delete-links.js'
import { getVisibleTopLevelFrameNodes } from '../utilities/get-visible-top-level-frame-nodes.js'
import { defaultSettings, settingsKey } from '../utilities/settings.js'
import { linkFrameNodes } from './utilities/link-frame-nodes.js'
import { numberFrameNodes } from './utilities/number-frame-nodes.js'
import { sortFrameNodes } from './utilities/sort-frame-nodes.js'

export default async function (): Promise<void> {
  let nodes = getVisibleTopLevelFrameNodes()
  if (nodes.length < 2) {
    figma.closePlugin(formatErrorMessage('Need at least 2 frames'))
    return
  }
  const { flowName, shouldNumberFrameNodes } = await loadSettingsAsync(
    defaultSettings,
    settingsKey
  )
  deleteLinks(nodes)
  nodes = sortFrameNodes(nodes)
  updateNodesSortOrder(nodes)
  if (shouldNumberFrameNodes === true) {
    numberFrameNodes(nodes)
  }
  linkFrameNodes(nodes)
  figma.currentPage.flowStartingPoints = [
    { name: flowName, nodeId: nodes[nodes.length - 1].id }
  ]
  setRelaunchButton(figma.currentPage, 'link-slides')
  setRelaunchButton(figma.currentPage, 'unlink-slides')
  figma.closePlugin(
    formatSuccessMessage(
      `Linked ${nodes.length} ${pluralize(nodes.length, 'slide')}`
    )
  )
}
