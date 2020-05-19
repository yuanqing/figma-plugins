import { saveSettingsAsync } from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'

export default async function () {
  await saveSettingsAsync(defaultSettings)
  figma.closePlugin('Reset plugin')
}
