/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../../utilities/default-settings'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  addEventListener('SET_LOCALE', async function ({ locale }) {
    await saveSettings({
      ...settings,
      locale
    })
    figma.closePlugin(formatSuccessMessage('Set locale'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 88 }, settings)
}
