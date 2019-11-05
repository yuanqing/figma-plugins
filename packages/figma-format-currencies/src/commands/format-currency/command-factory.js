/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../../utilities/default-settings'
import { getTextLayers } from '../../utilities/get-text-layers'

export function commandFactory (createSuccessMessage) {
  return async function () {
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    const { locale } = await loadSettings(defaultSettings)
    addEventListener('FORMAT_RESULT', function (result) {
      for (const { id, characters } of result) {
        const layer = figma.getNodeById(id)
        layer.characters = characters
      }
      figma.closePlugin(formatSuccessMessage(createSuccessMessage(scope)))
    })
    showUI({ visible: false })
    await loadFonts(layers)
    triggerEvent(
      'FORMAT',
      layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      locale
    )
  }
}
