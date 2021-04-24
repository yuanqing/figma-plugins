import {
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { Settings } from '../utilities/types'
import { CloseUIHandler, SubmitHandler } from './utilities/types'

export default async function (): Promise<void> {
  const settings = await loadSettingsAsync(defaultSettings)
  once<SubmitHandler>('SUBMIT', async function (settings: Settings) {
    await saveSettingsAsync(settings)
    figma.closePlugin(formatSuccessMessage('Saved settings'))
  })
  once<CloseUIHandler>('CLOSE_UI', function () {
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
