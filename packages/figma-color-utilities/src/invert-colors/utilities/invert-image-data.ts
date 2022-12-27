export function invertImageData(imageData: ImageData): ImageData {
  const bytes = imageData.data
  let i = 0
  while (i < bytes.length) {
    bytes[i] = 255 - bytes[i]
    bytes[i + 1] = 255 - bytes[i + 1]
    bytes[i + 2] = 255 - bytes[i + 2]
    i += 4
  }
  return imageData
}
