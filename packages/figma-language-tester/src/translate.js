import { fetch } from '@create-figma-plugin/utilities'
import pMemoize from 'p-memoize'

export const translate = pMemoize(async function (text, languageKey) {
  const result = await fetch(
    `
      https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q=${encodeURI(
      text
    )}
    `
  )
  return result[0][0][0]
})
