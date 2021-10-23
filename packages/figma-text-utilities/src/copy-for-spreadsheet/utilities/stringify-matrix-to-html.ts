export function stringifyMatrixToHTML(matrix: Array<Array<string>>): string {
  const lines: Array<string> = []
  for (const row of matrix) {
    const line = row
      .map(function (text: string): string {
        return `<td>${normalizeText(text)}</td>`
      })
      .join('')
    lines.push(`<tr>${line}</tr>`)
  }
  return `<table>${lines.join('')}</table>`
}

const CHARACTER_ENTITIES: Record<string, string> = {
  '"': '&quot',
  '&': '&amp',
  "'": '&#39',
  '<': '&lt',
  '>': '&gt'
}
const specialCharactersRegex = /[&<"']/g
const newlineRegex = /\n/g

function normalizeText(string: string) {
  return string
    .replace(specialCharactersRegex, function (character: string) {
      return CHARACTER_ENTITIES[character]
    })
    .replace(newlineRegex, '<br />')
}
