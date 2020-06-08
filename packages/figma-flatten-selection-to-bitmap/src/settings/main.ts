import {
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings)
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    figma.closePlugin(formatSuccessMessage('Saved settings'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    {
      height: 136,
      width: 240
    },
    settings
  )
}
