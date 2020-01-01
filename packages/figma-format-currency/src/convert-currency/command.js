import {
  addEventListener,
  extractAttributes,
  formatSuccessMessage,
  loadFonts,
  loadSettings,
  onSelectionChange,
  saveSettings,
  showUI,
  triggerEvent
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { getTextLayers } from '../utilities/get-text-layers'

export default async function () {
  const layers = getLayers()
  const {
    targetCurrency,
    roundNumbers,
    locale,
    ...settings
  } = await loadSettings(defaultSettings)
  onSelectionChange(function () {
    triggerEvent('SELECTION_CHANGED', { layers: getLayers() })
  })
  addEventListener('SUBMIT', async function ({
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
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
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

function getLayers () {
  return extractAttributes(getTextLayers(), ['id', 'characters'])
}
