import pMemoize from 'p-memoize'

export const translate = pMemoize(async function (text, languageKey, apiKey) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${encode(
    text
  )}&lang=${languageKey}`
  const response = await window.fetch(url)
  const result = await response.json()
  return result.text[0]
})

const newlineRegex = /\n/

function encode (text) {
  return encodeURI(text).replace(newlineRegex, '%0A')
}
