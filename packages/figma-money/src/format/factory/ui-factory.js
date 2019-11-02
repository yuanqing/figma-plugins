import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'

export function uiFactory (callback) {
  return function () {
    addEventListener('FORMAT', function (layers, locale) {
      const result = layers.map(function ({ id, characters }) {
        return {
          id,
          characters: callback(characters, locale)
        }
      })
      triggerEvent('FORMAT_RESULT', result)
    })
  }
}
