export function addIsoCodeSuffix(string: string, isoCode: string): string {
  if (string.indexOf(isoCode) === -1) {
    return `${string} ${isoCode}`
  }
  return string
}
