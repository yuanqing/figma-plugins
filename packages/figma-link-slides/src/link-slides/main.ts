import {
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
} from '@create-figma-plugin/utilities'

import { deleteLinks } from '../utilities/delete-links.js'
import { getVisibleTopLevelFrameNodes } from '../utilities/get-visible-top-level-frame-nodes.js'
import { defaultSettings, settingsKey } from '../utilities/settings.js'
import { Settings } from '../utilities/types.js'
import { linkFrameNodes } from './utilities/link-frame-nodes.js'
import { renameFrameNodes } from './utilities/rename-frame-nodes.js'
import {
  CloseUIHandler,
  LinkSlidesProps,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const nodes = getVisibleTopLevelFrameNodes()
  if (nodes.length < 2) {
    figma.closePlugin(formatErrorMessage('Need at least 2 frames'))
    return
  }

  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })

  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    const { flowName, shouldNumberFrameNodes } = settings
    await saveSettingsAsync(settings, settingsKey)
    const nodes = getVisibleTopLevelFrameNodes()
    deleteLinks(nodes)
    if (shouldNumberFrameNodes === true) {
      renameFrameNodes(nodes)
    }
    linkFrameNodes(nodes)
    figma.currentPage.flowStartingPoints = [
      { name: flowName, nodeId: nodes[0].id }
    ]
    setRelaunchButton(figma.currentPage, 'link-slides')
    setRelaunchButton(figma.currentPage, 'delete-links')
    figma.closePlugin(
      formatSuccessMessage(
        `Linked ${nodes.length} ${pluralize(nodes.length, 'slide')}`
      )
    )
  })

  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  showUI<LinkSlidesProps>({ height: 160, width: 240 }, settings)
}
