import {
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'

export default async function () {
  const settings = await loadSettingsAsync(defaultSettings)
  once('SUBMIT', async function (settings) {
    await saveSettingsAsync(settings)
    figma.closePlugin(formatSuccessMessage('Set resolution'))
  })
  once('CLOSE_UI', function () {
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
