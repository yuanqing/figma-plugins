export function invertRgb(rgb: RGB): RGB {
  const { r, g, b } = rgb
  return {
    b: 1 - b,
    g: 1 - g,
    r: 1 - r
  }
}
