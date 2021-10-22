export function stringify2dMatrix(matrix: Array<Array<string>>): string {
  const lines: Array<string> = []
  for (const row of matrix) {
    lines.push(row.join('\t'))
  }
  return lines.join('\n')
}
