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
  const settings = await loadSettings()
  const apiKey = settings.apiKey
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
  const notificationHandler = showLoadingNotification()
  const selection = figma.currentPage.selection
  const nodes = selection.length === 0 ? [figma.currentPage] : selection
  const promises = []
  for (const node of nodes) {
    traverseNode(node, async function (node) {
      if (node.type !== 'TEXT') {
        return
      }
      if (typeof originalStrings[node.id] === 'undefined') {
        originalStrings[node.id] = node.characters
      }
      await figma.loadFontAsync(node.fontName)
      const translated = await translate(
        originalStrings[node.id],
        languageKey,
        apiKey
      )
      node.characters = translated
      promises.push(Promise.resolve())
    })
  }
  await Promise.all(promises)
  notificationHandler.cancel()
  figma.notify(`✔ Set language to ${languages[languageKey]}`, { timeout: 2000 })
}

async function resetLanguage (originalStrings) {
  const notificationHandler = showLoadingNotification()
  const promises = []
  traverseNode(figma.currentPage, async function (node) {
    if (node.type !== 'TEXT') {
      return
    }
    if (typeof originalStrings[node.id] === 'undefined') {
      return
    }
    await figma.loadFontAsync(node.fontName)
    node.characters = originalStrings[node.id]
    promises.push(Promise.resolve())
  })
  await Promise.all(promises)
  notificationHandler.cancel()
  figma.notify('✔ Reset language', { timeout: 2000 })
}

function showLoadingNotification () {
  return figma.notify('Translating…', { timeout: 60000 })
}
