import { fetch } from '@create-figma-plugin/utilities'
import pMemoize from 'p-memoize'

export const translate = pMemoize(async function (text, languageKey, apiKey) {
  const result = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${encode(
      text
    )}&lang=${languageKey}`
  )
  return result.text[0]
})

const newlineRegex = /\n/

function encode (text) {
  return encodeURI(text).replace(newlineRegex, '%0A')
}
