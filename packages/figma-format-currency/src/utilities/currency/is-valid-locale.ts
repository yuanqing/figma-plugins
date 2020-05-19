export function isValidLocale(locale) {
  try {
    // FIXME
    ;(Intl as any).getCanonicalLocales(locale)
  } catch (error) {
    return false
  }
  return true
}
