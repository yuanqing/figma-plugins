import pMemoize from 'p-memoize'

export const translateAsync = pMemoize(async function (
  text: string,
  languageKey: string
) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${languageKey}&dt=t&q=${encode(
    text
  )}`
  const response = await window.fetch(url)
  const result = await response.json()
  return result[0]
    .map(function (item) {
      return item[0] as string
    })
    .join('')
})

const newlineRegex = /\n/

function encode(text: string) {
  return encodeURI(text).replace(newlineRegex, '%0A')
}
