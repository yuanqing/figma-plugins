/* global figma */

import {
  addCommandEventListener,
  showUi,
  traverseNode
} from '@create-figma-plugin/utilities'
import languages from './languages'
import { translate } from './translate'

export default function () {
  showUi({
    width: 240,
    height: 259
  })
  const originalStrings = {} // maps `node.id` to the original strings
  addCommandEventListener('SET_LANGUAGE', function (languageKey) {
    setLanguage(originalStrings, languageKey)
  })
  addCommandEventListener('RESET_LANGUAGE', function () {
    resetLanguage(originalStrings)
  })
}

function setLanguage (originalStrings, languageKey) {
  const selection = figma.currentPage.selection
  const nodes = selection.length === 0 ? [figma.currentPage] : selection
  for (const node of nodes) {
    traverseNode(node, async function (node) {
      if (node.type !== 'TEXT') {
        return
      }
      if (typeof originalStrings[node.id] === 'undefined') {
        originalStrings[node.id] = node.characters
      }
      await figma.loadFontAsync(node.fontName)
      const translated = await translate(originalStrings[node.id], languageKey)
      node.characters =
        translated === '' ? originalStrings[node.id] : translated
    })
  }
  figma.notify(`✔ Set language to ${languages[languageKey]}`, { timeout: 1000 })
}

function resetLanguage (originalStrings) {
  traverseNode(figma.currentPage, async function (node) {
    if (node.type !== 'TEXT') {
      return
    }
    if (typeof originalStrings[node.id] === 'undefined') {
      return
    }
    await figma.loadFontAsync(node.fontName)
    node.characters = originalStrings[node.id]
  })
  figma.notify('✔ Reset language', { timeout: 1000 })
}
