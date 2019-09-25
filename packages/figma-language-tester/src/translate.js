import fetch from 'unfetch'
import pMemoize from 'p-memoize'

export const translate = pMemoize(async function (text, languageKey) {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q=${encodeURI(
      text
    )}`
  )
  const json = await response.json()
  return json[0][0][0]
})
