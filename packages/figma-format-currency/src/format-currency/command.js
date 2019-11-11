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
import { defaultSettings } from '../utilities/default-settings'
import { getTextLayers } from '../utilities/get-text-layers'

export default async function () {
  const { layers, scope } = getTextLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
    return
  }
  const { format, locale, ...settings } = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function ({ format, locale }) {
    await saveSettings({
      ...settings,
      format,
      locale
    })
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    await loadFonts(layers)
    triggerEvent('FORMAT_CURRENCY_REQUEST', {
      layers: layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      scope,
      format,
      locale
    })
  })
  addEventListener('FORMAT_CURRENCY_RESULT', function ({ layers, scope }) {
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      layer.characters = characters
    }
    figma.closePlugin(formatSuccessMessage(`Formatted currencies ${scope}`))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 236 }, { format, locale })
}
