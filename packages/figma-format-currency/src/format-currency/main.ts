import {
  emit,
  formatSuccessMessage,
  loadFontsAsync,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { getTextNodes } from '../utilities/get-text-nodes'

export default async function (): Promise<void> {
  const { format, locale, ...settings } = await loadSettingsAsync(
    defaultSettings
  )
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      nodes: getTextNodes()
    })
  })
  once('SUBMIT', async function ({ nodes, format, locale }) {
    await saveSettingsAsync({
      ...settings,
      format,
      locale
    })
    for (const { id, characters } of nodes) {
      const node = figma.getNodeById(id) as TextNode
      await loadFontsAsync([node])
      node.characters = characters
    }
    figma.closePlugin(formatSuccessMessage('Formatted currencies in selection'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const nodes = getTextNodes()
  showUI(
    { width: 240, height: 333 },
    {
      nodes,
      format,
      locale
    }
  )
}
