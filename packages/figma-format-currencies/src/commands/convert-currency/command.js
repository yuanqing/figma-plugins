/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../settings/default-settings'
import { getTextLayers } from '../../utilities/get-text-layers'

export default async function () {
  const layers = getTextLayers()
  const scope =
    figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
    return
  }
  const settings = (await loadSettings()) || defaultSettings
  await loadFonts(layers)
  addEventListener('CONVERT_CURRENCY_RESULT', async function (
    currency,
    layers
  ) {
    settings.currency = currency
    await saveSettings(settings)
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
  showUI(
    { width: 240, height: 116 },
    {
      currency: settings.currency,
      locale: settings.locale,
      layers: layers.map(function ({ id, characters }) {
        return { id, characters }
      })
    }
  )
}
