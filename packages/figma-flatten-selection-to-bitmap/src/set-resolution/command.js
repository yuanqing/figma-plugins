import {
  formatSuccessMessage,
  loadSettings,
  on,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'

export default async function () {
  const settings = await loadSettings(defaultSettings)
  on('SUBMIT', async function (settings) {
    await saveSettings(settings)
    figma.closePlugin(formatSuccessMessage('Set resolution'))
  })
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  showUI(
    {
      width: 240,
      height: 136
    },
    settings
  )
}
