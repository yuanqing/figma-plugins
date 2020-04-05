import { emit, on } from '@create-figma-plugin/utilities'
import { translate } from './translate'

export default function () {
  on('TRANSLATE_REQUEST', async function ({
    apiKey,
    languageKey,
    layers,
    scope
  }) {
    const promises = layers.map(function ({ characters }) {
      return translate(characters, languageKey, apiKey)
    })
    const translated = await Promise.all(promises)
    emit('TRANSLATE_RESULT', {
      languageKey,
      layers: layers.map(function ({ id }, index) {
        return {
          id,
          characters: translated[index]
        }
      }),
      scope
    })
  })
}
