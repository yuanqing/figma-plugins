/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../default-settings'

export default async function () {
  const settings = (await loadSettings()) || defaultSettings
  addEventListener('SAVE_API_KEY', async function (settings) {
    await saveSettings(settings)
    figma.closePlugin(formatSuccessMessage('Saved API key'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 116 }, settings)
}
