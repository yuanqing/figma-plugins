/* global figma */
import {
  addCommandEventListener,
  loadSettings,
  showUi,
  traverseNode
} from '@create-figma-plugin/utilities'
import languages from './languages'
import { translate } from './translate'
import setApiKeyCommand from '../set-api-key/command'

export default async function () {
  const { apiKey } = await loadSettings()
  if (typeof apiKey === 'undefined' || apiKey === '') {
    setApiKeyCommand()
    return
  }
  showUi({
    width: 240,
    height: 259
  })
  const originalStrings = {} // maps `node.id` to the original strings
  addCommandEventListener('SET_LANGUAGE', function (languageKey) {
    setLanguage(originalStrings, languageKey, apiKey)
  })
  addCommandEventListener('RESET_LANGUAGE', function () {
    resetLanguage(originalStrings)
  })
}

async function setLanguage (originalStrings, languageKey, apiKey) {
  const notificationHandler = figma.notify('Translating…', { timeout: 60000 })
  const selection = figma.currentPage.selection
  const nodes = filterNodes(
    selection.length === 0 ? [figma.currentPage] : selection,
    function (node) {
      return node.type === 'TEXT'
    }
  )
  nodes.forEach(function (node) {
    if (typeof originalStrings[node.id] === 'undefined') {
      originalStrings[node.id] = node.characters
    }
  })
  await loadFonts(nodes)
  const promises = nodes.map(function (node) {
    return translate(originalStrings[node.id], languageKey, apiKey)
  })
  const translated = await Promise.all(promises)
  nodes.forEach(function (node, index) {
    node.characters = translated[index]
  })
  notificationHandler.cancel()
  figma.notify(`✔ Translated to ${languages[languageKey]}`, { timeout: 2000 })
}

async function resetLanguage (originalStrings) {
  const notificationHandler = figma.notify('Working…', { timeout: 60000 })
  const nodes = filterNodes([figma.currentPage], function (node) {
    return (
      node.type === 'TEXT' && typeof originalStrings[node.id] !== 'undefined'
    )
  })
  await loadFonts(nodes)
  nodes.forEach(function (node) {
    node.characters = originalStrings[node.id]
  })
  notificationHandler.cancel()
  figma.notify('✔ Reset', { timeout: 2000 })
}

function filterNodes (nodes, filterCallback) {
  const result = []
  for (const node of nodes) {
    traverseNode(node, async function (node) {
      if (filterCallback(node)) {
        result.push(node)
      }
    })
  }
  return result
}

function loadFonts (nodes) {
  const promises = nodes.map(function (node) {
    return figma.loadFontAsync(node.fontName)
  })
  return Promise.all(promises)
}
