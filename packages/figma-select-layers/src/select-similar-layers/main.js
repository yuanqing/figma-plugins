import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  mapNumberToWord,
  on,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'
import { defaultSettings } from '../utilities/default-settings'
import { getSimilarLayers } from './utilities/get-similar-layers'

export default async function () {
  const selectedLayers = figma.currentPage.selection
  const length = selectedLayers.length
  if (length !== 1) {
    figma.closePlugin(createErrorMessage(length))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  function onSelectionChange () {
    const selectedLayers = figma.currentPage.selection
    const length = selectedLayers.length
    if (length !== 1) {
      figma.notify(createErrorMessage(length))
    }
    emit('SELECTION_CHANGED', {
      referenceLayerType: length === 1 ? selectedLayers[0].type : null
    })
  }
  figma.on('selectionchange', onSelectionChange)
  on('SUBMIT', async function ({ attributes }) {
    figma.off('selectionchange', onSelectionChange)
    await saveSettingsAsync({
      ...settings,
      selectSimilarLayers: attributes
    })
    const referenceLayer = figma.currentPage.selection[0]
    const result = getSimilarLayers(referenceLayer, extractTrueKeys(attributes))
    if (result.length === 1) {
      figma.closePlugin(formatErrorMessage('No similar layers on page'))
      return
    }
    figma.currentPage.selection = result
    figma.viewport.scrollAndZoomIntoView(result)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${mapNumberToWord(result.length)} ${pluralize(
          result.length,
          'similar layer'
        )}`
      )
    )
  })
  on('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const { selectSimilarLayers } = settings
  showUI(
    { width: 240, height: 436 },
    {
      attributes: selectSimilarLayers,
      referenceLayerType: selectedLayers[0].type
    }
  )
}

function createErrorMessage (length) {
  return formatErrorMessage(
    length === 0
      ? 'Select a reference layer'
      : 'Select only one reference layer'
  )
}

function extractTrueKeys (attributes) {
  let result = []
  for (const key in attributes) {
    const value = attributes[key]
    if (typeof value === 'object') {
      result = [...result, ...extractTrueKeys(value)]
      continue
    }
    if (value === true) {
      result.push(key)
    }
  }
  return result
}
