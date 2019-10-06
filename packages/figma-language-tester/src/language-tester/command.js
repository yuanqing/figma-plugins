/* global figma */
import {
  addEventListener,
  loadSettings,
  showUi,
  traverseLayer
} from '@create-figma-plugin/utilities'
import languages from './languages'
import { translate } from './translate'
import setApiKeyCommand from '../set-api-key/command'

export default async function () {
  const { apiKey } = await loadSettings()
  if (typeof apiKey === 'undefined' || apiKey === '') {
    global.__command__ = 'set-api-key/command.js'
    setApiKeyCommand()
    return
  }
  const layers = getTextLayers()
  if (layers.length === 0) {
    figma.closePlugin(
      `✘ \u00a0 No text layers ${
        figma.currentPage.selection.length > 0 ? 'in selection' : 'on page'
      }`,
      { timeout: 2000 }
    )
    return
  }
  showUi({
    width: 240,
    height: 259
  })
  const originalStrings = {} // maps `layer.id` to the original strings
  addEventListener('SET_LANGUAGE', async function (languageKey) {
    await setLanguage(originalStrings, languageKey, apiKey)
  })
  addEventListener('RESET_LANGUAGE', async function (close) {
    await resetLanguage(originalStrings)
    if (close) {
      figma.closePlugin()
    }
  })
  addEventListener('CLOSE', async function () {
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
  figma.notify(`✔ \u00a0 Translated to ${languages[languageKey]}`, {
    timeout: 2000
  })
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
  figma.notify('Reset', { timeout: 2000 })
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

function filterLayers (layers, filterCallback) {
  const result = []
  for (const layer of layers) {
    traverseLayer(layer, async function (layer) {
      if (filterCallback(layer)) {
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
