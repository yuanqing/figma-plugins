import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from './default-settings'

export function mainFactory(
  direction: string,
  distributeNodes: (layers: Array<SceneNode>, space: number) => void
): () => void {
  return async function (): Promise<void> {
    if (figma.currentPage.selection.length < 2) {
      figma.closePlugin(formatErrorMessage('Select two or more layers'))
      return
    }
    const settings = await loadSettingsAsync(defaultSettings)
    figma.on('selectionchange', function () {
      emit('SELECTION_CHANGED', {
        hasSelection: figma.currentPage.selection.length > 1
      })
    })
    once('SUBMIT', async function (settings) {
      await saveSettingsAsync(settings)
      const { space } = settings
      distributeNodes(figma.currentPage.selection.slice(), space)
      figma.closePlugin(formatSuccessMessage(`Distributed layers ${direction}`))
    })
    once('CLOSE_UI', function () {
      figma.closePlugin()
    })
    showUI({ height: 140, width: 240 }, { ...settings, hasSelection: true })
  }
}
