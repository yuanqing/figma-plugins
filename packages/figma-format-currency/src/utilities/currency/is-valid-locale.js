export function isValidLocale (locale) {
  try {
    Intl.getCanonicalLocales(locale)
  } catch (error) {
    return false
  }
  return true
}
