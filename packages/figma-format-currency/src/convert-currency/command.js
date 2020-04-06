import {
  emit,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  on,
  saveSettings,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { getTextLayers } from '../utilities/get-text-layers'

export default async function () {
  const {
    targetCurrency,
    roundNumbers,
    locale,
    ...settings
  } = await loadSettings(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      layers: getTextLayers()
    })
  })
  on('SUBMIT', async function ({
    layers,
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
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      await loadFonts([layer])
      layer.characters = characters
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Converted currencies in selection to ${targetCurrency}`
      )
    )
  })
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const layers = getTextLayers()
  showUI(
    { width: 240, height: 357 },
    {
      layers,
      targetCurrency,
      roundNumbers,
      locale
    }
  )
}
