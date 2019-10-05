/* global figma */

import {
  addEventListener,
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
    figma.closePlugin('✔ Saved API key')
  })
  showUi({ width: 240, height: 112, data: settings })
}
