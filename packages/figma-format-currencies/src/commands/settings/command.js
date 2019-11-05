/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from './default-settings'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  addEventListener('SAVE_SETTINGS', async function ({ locale }) {
    await saveSettings({
      ...settings,
      locale
    })
    figma.closePlugin(formatSuccessMessage('Saved settings'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 116 }, settings)
}
