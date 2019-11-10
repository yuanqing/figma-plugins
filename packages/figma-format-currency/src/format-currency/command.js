/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { RETAIN } from './formats'
import { defaultSettings } from '../utilities/default-settings'
import { getTextLayers } from '../utilities/get-text-layers'

export default async function () {
  const { layers, scope } = getTextLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
    return
  }
  const { format, locale, ...settings } = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function (format, locale) {
    await saveSettings({
      ...settings,
      format,
      locale
    })
    const { layers, scope } = getTextLayers()
    await loadFonts(layers)
    triggerEvent(
      'FORMAT_CURRENCY_REQUEST',
      layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      scope,
      format,
      locale
    )
  })
  addEventListener('FORMAT_CURRENCY_RESULT', function (result, scope, format) {
    for (const { id, characters } of result) {
      const layer = figma.getNodeById(id)
      layer.characters = characters
    }
    const successMessage =
      format === RETAIN
        ? `Formatted currencies ${scope}`
        : `Set currencies ${scope} to ${format} format`
    figma.closePlugin(formatSuccessMessage(successMessage))
  })
  showUI({ width: 240, height: 200 }, { format, locale })
}
