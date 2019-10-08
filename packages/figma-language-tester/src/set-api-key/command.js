/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadSettings,
  saveSettings,
  showUi
} from '@create-figma-plugin/utilities'

export default async function () {
  const settings = (await loadSettings()) || {
    apiKey: ''
  }
  addEventListener('SAVE_API_KEY', async function (settings) {
    await saveSettings(settings)
    figma.closePlugin(formatSuccessMessage('Saved API key'))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUi({ width: 240, height: 116, data: settings })
}
