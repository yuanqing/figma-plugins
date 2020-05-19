export function addIsoCodeSuffix(string, isoCode) {
  if (string.indexOf(isoCode) === -1) {
    return `${string} ${isoCode}`
  }
  return string
}
