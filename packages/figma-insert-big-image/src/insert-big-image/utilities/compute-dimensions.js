const MAX_DIMENSION = 4096

export function computeDimensions (dimension) {
  if (dimension <= MAX_DIMENSION) {
    return [dimension]
  }
  let pieces = 1
  let currentDimension
  do {
    pieces++
    currentDimension = Math.floor(dimension / pieces)
  } while (currentDimension >= MAX_DIMENSION)
  const remainder = dimension % currentDimension
  const result = Array(pieces - 1).fill(currentDimension)
  result.push(currentDimension + remainder)
  return result
}
