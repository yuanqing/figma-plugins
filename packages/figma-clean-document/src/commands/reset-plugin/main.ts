import { saveSettingsAsync } from '@create-figma-plugin/utilities'

import { defaultSettings, settingsKey } from '../../utilities/settings.js'

export default async function (): Promise<void> {
  await saveSettingsAsync(defaultSettings, settingsKey)
  figma.closePlugin('Reset plugin')
}
