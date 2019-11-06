import { addEventListener, triggerEvent } from '@create-figma-plugin/utilities'
import { translate } from './translate'

export default function () {
  addEventListener('TRANSLATE_REQUEST', async function (
    layers,
    scope,
    languageKey,
    apiKey
  ) {
    const promises = layers.map(function ({ characters }) {
      return translate(characters, languageKey, apiKey)
    })
    const translated = await Promise.all(promises)
    const result = layers.map(function ({ id }, index) {
      return {
        id,
        characters: translated[index]
      }
    })
    triggerEvent('TRANSLATE_RESULT', result, scope, languageKey)
  })
}
