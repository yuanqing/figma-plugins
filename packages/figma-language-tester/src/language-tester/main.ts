import {
  emit,
  formatErrorMessage,
  formatSuccessMessage,
  loadFontsAsync,
  on,
  once,
  showUI,
  traverseNode
} from '@create-figma-plugin/utilities'

import { getTextLayers } from '../utilities/get-text-layers'
import languages from '../utilities/languages.json'

export default async function () {
  const { layers, scope } = getTextLayers()
  if (layers.length === 0) {
    figma.closePlugin(formatErrorMessage(`No text layers ${scope}`))
    return
  }
  showUI({ height: 267, width: 240 })
  const originalStrings: { [key: string]: string } = {} // maps `layer.id` to the original strings
  figma.on('close', function () {
    resetLanguage(originalStrings)
  })
  let notificationHandler
  on('SET_LANGUAGE', async function ({ languageKey }) {
    notificationHandler = figma.notify('Translating…', { timeout: 60000 })
    const { layers, scope } = getTextLayers()
    layers.forEach(function (layer) {
      if (typeof originalStrings[layer.id] === 'undefined') {
        originalStrings[layer.id] = layer.characters
      }
    })
    await loadFontsAsync(layers)
    emit('TRANSLATE_REQUEST', {
      languageKey,
      layers: layers.map(function ({ id, characters }) {
        return { characters, id }
      }),
      scope
    })
  })
  on('TRANSLATE_RESULT', async function ({ languageKey, layers, scope }) {
    notificationHandler.cancel()
    for (const { id, characters } of layers) {
      const layer = figma.getNodeById(id) as TextNode
      layer.characters = characters
    }
    figma.notify(
      formatSuccessMessage(
        `Translated text ${scope} to ${languages[languageKey]}`
      )
    )
  })
  on('RESET_LANGUAGE', function () {
    resetLanguage(originalStrings)
  })
  once('CLOSE_UI', function () {
    figma.closePlugin()
  })
}

function resetLanguage(originalStrings: { [key: string]: string }) {
  const layers = filterLayers(figma.currentPage.children.slice(), function (
    layer: SceneNode
  ) {
    return (
      layer.type === 'TEXT' && typeof originalStrings[layer.id] !== 'undefined'
    )
  })
  let didChange = false
  for (const layer of layers) {
    if (layer.characters !== originalStrings[layer.id]) {
      didChange = true
      layer.characters = originalStrings[layer.id]
    }
  }
  if (didChange === true) {
    figma.notify('Reset')
  }
}

function filterLayers(
  layers: Array<SceneNode>,
  filter: (layer: SceneNode) => boolean
) {
  const result = []
  for (const layer of layers) {
    traverseNode(layer, async function (layer) {
      if (filter(layer) === true) {
        result.push(layer)
      }
    })
  }
  return result
}
