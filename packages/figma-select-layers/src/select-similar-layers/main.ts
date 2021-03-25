import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettingsAsync,
  once,
  pluralize,
  saveSettingsAsync,
  showUI
} from '@create-figma-plugin/utilities'

import { defaultSettings } from '../utilities/default-settings'
import { getSimilarNodes } from './utilities/get-similar-nodes'

export default async function (): Promise<void> {
  const selection = figma.currentPage.selection
  const length = selection.length
  if (length !== 1) {
    figma.closePlugin(createErrorMessage(length))
    return
  }
  const settings = await loadSettingsAsync(defaultSettings)
  function onSelectionChange() {
    const selection = figma.currentPage.selection
    const length = selection.length
    if (length !== 1) {
      figma.notify(createErrorMessage(length))
    }
    emit('SELECTION_CHANGED', {
      referenceLayerType: length === 1 ? selection[0].type : null
    })
  }
  figma.on('selectionchange', onSelectionChange)
  once('SUBMIT', async function ({ attributes }) {
    figma.off('selectionchange', onSelectionChange)
    await saveSettingsAsync({
      ...settings,
      selectSimilarLayers: attributes
    })
    const referenceNode = figma.currentPage.selection[0]
    const result = getSimilarNodes(referenceNode, extractTrueKeys(attributes))
    if (result.length === 1) {
      figma.closePlugin(formatErrorMessage('No similar layers on page'))
      return
    }
    figma.currentPage.selection = result
    figma.viewport.scrollAndZoomIntoView(result)
    figma.closePlugin(
      formatSuccessMessage(
        `Selected ${result.length} ${pluralize(result.length, 'similar layer')}`
      )
    )
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
  const { selectSimilarLayers } = settings
  showUI(
    { height: 436, width: 240 },
    {
      attributes: selectSimilarLayers,
      referenceLayerType: selection[0].type
    }
  )
}

function createErrorMessage(length: number): string {
  return formatErrorMessage(
    length === 0
      ? 'Select a reference layer'
      : 'Select only one reference layer'
  )
}

function extractTrueKeys(attributes: { [key: string]: any }): Array<string> {
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
