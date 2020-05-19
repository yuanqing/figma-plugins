import { emit, once } from '@create-figma-plugin/utilities'

import { translateAsync } from './translate-async'

export default function () {
  once('TRANSLATE_REQUEST', async function ({
    apiKey,
    languageKey,
    layers,
    scope
  }) {
    const promises = layers.map(function ({ characters }) {
      return translateAsync(characters, languageKey, apiKey)
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
