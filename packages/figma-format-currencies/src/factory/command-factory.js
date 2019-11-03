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
import { defaultSettings } from '../default-settings'
import { getTextLayers } from '../get-text-layers'

export function commandFactory (successMessage) {
  return async function () {
    const layers = getTextLayers()
    if (layers.length === 0) {
      const scope =
        figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    const settings = (await loadSettings()) || defaultSettings
    await loadFonts(layers)
    addEventListener('FORMAT_RESULT', function (result) {
      for (const { id, characters } of result) {
        const layer = figma.getNodeById(id)
        layer.characters = characters
      }
      figma.closePlugin(formatSuccessMessage(successMessage))
    })
    showUI({ visible: false })
    triggerEvent(
      'FORMAT',
      layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      settings.locale
    )
  }
}
