import {
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings, settingsKey } from '../utilities/settings.js'
import { Settings } from '../utilities/types.js'
import {
  CloseUIHandler,
  SettingsProps,
  SubmitHandler
} from './utilities/types.js'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings, settingsKey)
  once<CloseUIHandler>('CLOSE_UI', function () {
    figma.closePlugin()
  })
  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings, settingsKey)
    figma.closePlugin(formatSuccessMessage('Saved settings'))
  })
  showUI<SettingsProps>(
    {
      height: 132,
      title: 'Settings',
      width: 240
    },
    settings
  )
}
