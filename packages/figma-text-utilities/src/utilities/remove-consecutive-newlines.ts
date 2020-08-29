export function removeConsecutiveNewlines(string: string) {
  return string.replace(/\n{2,}/g, '\n')
}
