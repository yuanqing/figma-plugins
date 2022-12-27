import tinycolor from 'tinycolor2'

export function invertImageData(imageData: ImageData): ImageData {
  const bytes = imageData.data
  let i = 0
  while (i < bytes.length) {
    const { r, g, b } = tinycolor({
      b: bytes[i + 2],
      g: bytes[i + 1],
      r: bytes[i]
    })
      .greyscale()
      .toRgb()
    bytes[i] = r
    bytes[i + 1] = g
    bytes[i + 2] = b
    i += 4
  }
  return imageData
}
