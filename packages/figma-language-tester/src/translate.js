import { fetch } from '@create-figma-plugin/utilities'
import pMemoize from 'p-memoize'

export const translate = pMemoize(async function (text, languageKey) {
  const json = await fetch(
    `
      https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q=${encode(
      text
    )}
    `
  )
  if (json[0].length === 1) {
    return json[0][0][0]
  }
  const result = []
  json[0].forEach(function (line) {
    result.push(line[0])
  })
  return result.join('')
})

const newlineRegex = /\n/

function encode (text) {
  return encodeURI(text).replace(newlineRegex, '%0A%0A')
}
