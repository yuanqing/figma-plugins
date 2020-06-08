import {
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../default-settings'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    figma.closePlugin(formatSuccessMessage('Saved API key'))
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI({ height: 160, width: 240 }, settings)
}
