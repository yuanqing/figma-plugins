import {
  emit,
  formatSuccessMessage,
  loadFontsAsync,
  loadSettingsAsync,
  once,
  saveSettingsAsync,
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
  } = await loadSettingsAsync(defaultSettings)
  figma.on('selectionchange', function () {
    emit('SELECTION_CHANGED', {
      layers: getTextLayers()
    })
  })
  once('SUBMIT', async function ({
    layers,
    targetCurrency,
    roundNumbers,
    locale
  }) {
    await saveSettingsAsync({
      ...settings,
      targetCurrency,
      roundNumbers,
      locale
    })
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id)
      await loadFontsAsync([layer])
      layer.characters = characters
    }
    figma.closePlugin(
      formatSuccessMessage(
        `Converted currencies in selection to ${targetCurrency}`
      )
    )
  })
  once('CLOSE_UI', function () {
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
