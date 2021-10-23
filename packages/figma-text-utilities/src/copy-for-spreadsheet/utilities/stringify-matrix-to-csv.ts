export function stringifyMatrixToCSV(matrix: Array<Array<string>>): string {
  const lines: Array<string> = []
  for (const row of matrix) {
    const line = row
      .map(function (text: string): string {
        return normalizeText(text)
      })
      .join(',')
    lines.push(line)
  }
  return lines.join('\n')
}

const doubleQuoteRegex = /"/g
function normalizeText(text: string) {
  return `"${text.replace(doubleQuoteRegex, '""')}"` // escape double-quote
}
