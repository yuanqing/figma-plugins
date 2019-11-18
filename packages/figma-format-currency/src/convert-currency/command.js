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
  const {
    targetCurrency,
    roundNumbers,
    locale,
    ...settings
  } = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function ({
    targetCurrency,
    roundNumbers,
    locale
  }) {
    await saveSettings({
      ...settings,
      targetCurrency,
      roundNumbers,
      locale
    })
    const { layers, scope } = getTextLayers()
    if (layers.length === 0) {
      figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
      return
    }
    await loadFonts(layers)
    triggerEvent('CONVERT_CURRENCY_REQUEST', {
      layers: layers.map(function ({ id, characters }) {
        return { id, characters }
      }),
      scope,
      targetCurrency,
      roundNumbers,
      locale
    })
  })
  addEventListener('CONVERT_CURRENCY_RESULT', async function ({
    layers,
    scope,
    targetCurrency
  }) {
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      layer.characters = characters
    }
    figma.closePlugin(
      formatSuccessMessage(`Converted currencies ${scope} to ${targetCurrency}`)
    )
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({ width: 240, height: 236 }, { targetCurrency, roundNumbers, locale })
}
