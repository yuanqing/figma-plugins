import { traverseNode } from '@create-figma-plugin/utilities'
import { languages } from './languages'
import { translate } from './translate'

export default async function (figma, { showUI, onMessage }) {
  showUI({
    width: 240,
    height: 190,
    data: {}
  })
  const originalStrings = {} // maps `node.id` to the original strings
  onMessage(async function ({ type, languageKey }) {
    const page = figma.currentPage
    switch (type) {
      case 'SET_LANGUAGE': {
        setLanguage(figma, page, originalStrings, languageKey)
        break
      }
      case 'RESET_LANGUAGE': {
        resetLanguage(figma, page, originalStrings)
        break
      }
    }
  })
}

function setLanguage (figma, page, originalStrings, languageKey) {
  traverseNode(page, async function (node) {
    if (node.type !== 'TEXT') {
      return
    }
    if (typeof originalStrings[node.id] === 'undefined') {
      originalStrings[node.id] = node.characters
    }
    await figma.loadFontAsync(node.fontName)
    node.characters = await translate(originalStrings[node.id], languageKey)
  })
  figma.notify(`✔ Set language to ${languages[languageKey]}`, { timeout: 1000 })
}

function resetLanguage (figma, page, originalStrings) {
  traverseNode(page, async function (node) {
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
