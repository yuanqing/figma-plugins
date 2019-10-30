/* global figma */
import {
  formatErrorMessage,
  formatSuccessMessage,
  loadFonts
} from '@create-figma-plugin/utilities'
import { getTextLayers } from '../get-text-layers'
import { formatExplicit } from './format-explicit'
import { defaultSettings as settings } from '../default-settings'

export default async function () {
  const layers = getTextLayers()
  if (layers.length === 0) {
    const scope =
      figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
    figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
    return
  }
  await loadFonts(layers)
  for (const layer of layers) {
    layer.characters = formatExplicit(layer.characters, settings)
  }
  figma.closePlugin(
    formatSuccessMessage('Changed currencies to explicit format')
  )
}
