export function isValidLocale(locale: string): boolean {
  try {
    // FIXME
    ;(Intl as any).getCanonicalLocales(locale)
  } catch (error) {
    return false
  }
  return true
}
