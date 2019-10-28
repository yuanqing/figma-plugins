/* global figma */
import {
  addEventListener,
  formatErrorMessage,
  formatSuccessMessage,
  loadSettings,
  showUI,
  traverseLayer
} from '@create-figma-plugin/utilities'
import languages from './languages'
import { translate } from './translate'

export default async function () {
  const { apiKey } = await loadSettings()
  if (typeof apiKey === 'undefined' || apiKey === '') {
    figma.closePlugin(
      formatErrorMessage(
        'Add an API key via Plugins › Language Tester › Set API Key'
      ),
      { timeout: 10000 }
    )
    return
  }
  const layers = getTextLayers()
  if (layers.length === 0) {
    figma.closePlugin(
      formatErrorMessage(
        `No text layers ${
          figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
        }`
      )
    )
    return
  }
  showUI(240, 259)
  const originalStrings = {} // maps `layer.id` to the original strings
  addEventListener('SET_LANGUAGE', async function (languageKey) {
    await setLanguage(originalStrings, languageKey, apiKey)
  })
  addEventListener('RESET_LANGUAGE', async function (close) {
    await resetLanguage(originalStrings)
    if (close === true) {
      figma.closePlugin()
    }
  })
  addEventListener('CLOSE', function () {
    figma.closePlugin()
  })
}

async function setLanguage (originalStrings, languageKey, apiKey) {
  const notificationHandler = figma.notify('Translating…', { timeout: 60000 })
  const layers = getTextLayers()
  layers.forEach(function (layer) {
    if (typeof originalStrings[layer.id] === 'undefined') {
      originalStrings[layer.id] = layer.characters
    }
  })
  await loadFonts(layers)
  const promises = layers.map(function (layer) {
    return translate(originalStrings[layer.id], languageKey, apiKey)
  })
  const translated = await Promise.all(promises)
  layers.forEach(function (layer, index) {
    layer.characters = translated[index]
  })
  notificationHandler.cancel()
  figma.notify(formatSuccessMessage(`Translated to ${languages[languageKey]}`))
}

async function resetLanguage (originalStrings) {
  const layers = filterLayers([figma.currentPage], function (layer) {
    return (
      layer.type === 'TEXT' && typeof originalStrings[layer.id] !== 'undefined'
    )
  })
  await loadFonts(layers)
  layers.forEach(function (layer) {
    layer.characters = originalStrings[layer.id]
  })
  figma.notify('Reset')
}

function getTextLayers () {
  const selection = figma.currentPage.selection
  return filterLayers(
    selection.length === 0 ? [figma.currentPage] : selection,
    function (layer) {
      return layer.type === 'TEXT'
    }
  )
}

function filterLayers (layers, filter) {
  const result = []
  for (const layer of layers) {
    traverseLayer(layer, async function (layer) {
      if (filter(layer) === true) {
        result.push(layer)
      }
    })
  }
  return result
}

function loadFonts (layers) {
  const promises = layers.map(function (layer) {
    return figma.loadFontAsync(layer.fontName)
  })
  return Promise.all(promises)
}
