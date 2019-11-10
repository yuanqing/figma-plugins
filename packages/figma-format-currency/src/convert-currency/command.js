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
  const settings = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function (locale, currency, roundNumbers) {
    await saveSettings({
      ...settings,
      locale,
      currency,
      roundNumbers
    })
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    await loadFonts(layers)
    triggerEvent(
      'CONVERT_CURRENCY_REQUEST',
      layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      scope,
      locale,
      currency,
      roundNumbers
    )
  })
  addEventListener('CONVERT_CURRENCY_RESULT', async function (
    layers,
    scope,
    currency
  ) {
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      layer.characters = characters
    }
    figma.closePlugin(
      formatSuccessMessage(`Converted currencies ${scope} to ${currency}`)
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 274 }, settings)
}
