import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  isWithinInstanceNode,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  setRelaunchButton,
  showUI
} from '@create-figma-plugin/utilities'

import { PLUGIN_DATA_KEY } from '../utilities/constants.js'
import { defaultSettings, settingsKey } from '../utilities/default-settings.js'
import {
  CloseUIHandler,
  FrameUtilitiesProps,
  SelectionChangedHandler,
  Settings,
  SubmitHandler
} from '../utilities/types.js'
import { setFramePadding } from './utilities/set-frame-padding.js'

export default async function (): Promise<void> {
  if (getNodes().length === 0) {
    figma.closePlugin(formatErrorMessage('Select one or more frames'))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  figma.on('selectionchange', function (): void {
    emit<SelectionChangedHandler>('SELECTION_CHANGED', getNodes().length > 0)
  })
  once<SubmitHandler>(
    'SUBMIT',
    async function (settings: Settings): Promise<void> {
      await saveSettingsAsync(settings, settingsKey)
      const nodes = getNodes()
      for (const node of nodes) {
        setFramePadding(node, settings)
        node.setPluginData(PLUGIN_DATA_KEY, JSON.stringify(settings))
        setRelaunchButton(node, 'updateFramePadding')
        setRelaunchButton(node, 'editFramePadding')
      }
      figma.currentPage.selection = nodes
      figma.closePlugin(
        formatSuccessMessage(
          `Set padding on ${nodes.length} ${pluralize(nodes.length, 'frame')}`
        )
      )
    }
  )
  once<CloseUIHandler>('CLOSE_UI', function (): void {
    figma.closePlugin()
  })
  showUI<FrameUtilitiesProps>(
    {
      height: 116,
      width: 240
    },
    { ...settings, hasSelection: true }
  )
}

function getNodes(): Array<FrameNode | ComponentNode> {
  return figma.currentPage.selection.filter(function (
    node: SceneNode
  ): boolean {
    return (
      (node.type === 'FRAME' && isWithinInstanceNode(node) === false) ||
      node.type === 'COMPONENT' ||
      node.type === 'COMPONENT_SET'
    )
  }) as Array<FrameNode | ComponentNode>
}
