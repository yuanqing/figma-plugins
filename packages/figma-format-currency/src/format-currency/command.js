/* global figma */
import {
  addEventListener,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { extractCharacters } from '../utilities/extract-characters'
import { getTextLayers } from '../utilities/get-text-layers'

export default async function () {
  const layers = getTextLayers()
  const { format, locale, ...settings } = await loadSettings(defaultSettings)
  addEventListener('SUBMIT', async function ({ layers, format, locale }) {
    await saveSettings({
      ...settings,
      format,
      locale
    })
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      await loadFonts([layer])
      layer.characters = characters
    }
    figma.closePlugin(formatSuccessMessage('Formatted currencies in selection'))
  })
  figma.on('selectionchange', function () {
    const layers = getTextLayers()
    triggerEvent('SELECTION_CHANGED', extractCharacters(layers))
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
  showUI(
    { width: 240, height: 329 },
    {
      layers: extractCharacters(layers),
      format,
      locale
    }
  )
}
