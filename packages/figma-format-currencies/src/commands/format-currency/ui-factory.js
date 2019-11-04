import { triggerEvent } from '@create-figma-plugin/utilities'

export function uiFactory (callback) {
  return function (rootNode, { locale, layers }) {
    const result = layers.map(function ({ id, characters }) {
      return {
        id,
        characters: callback(characters, locale)
      }
    })
    triggerEvent('FORMAT_RESULT', result)
  }
}
