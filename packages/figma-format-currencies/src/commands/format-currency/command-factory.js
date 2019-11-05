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
import { defaultSettings } from '../settings/default-settings'
import { getTextLayers } from '../../utilities/get-text-layers'

export function commandFactory (createSuccessMessage) {
  return async function () {
    const layers = getTextLayers()
    const scope =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    if (layers.length === 0) {
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
      figma.closePlugin(formatSuccessMessage(createSuccessMessage(scope)))
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
