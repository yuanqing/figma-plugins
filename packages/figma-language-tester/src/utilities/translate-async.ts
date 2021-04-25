import pMemoize from 'p-memoize'

import { LanguageKey, TextNodePlainObject } from './types'

export const translateAsync = pMemoize(async function (
  { characters, id }: TextNodePlainObject,
  languageKey: LanguageKey
) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q=${encode(
    characters
  )}`
  const response = await window.fetch(url)
  const result = await response.json()
  const translated = result[0]
    .map(function (item: Array<string>) {
      return item[0]
    })
    .join('')
  return {
    characters: translated,
    id
  }
})

const newlineRegex = /\n/

function encode(text: string) {
  return encodeURI(text).replace(newlineRegex, '%0A')
}
