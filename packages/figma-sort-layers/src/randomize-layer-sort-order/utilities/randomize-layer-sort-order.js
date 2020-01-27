import arrayShuffle from 'array-shuffle'

export function randomizeLayerSortOrder (layers) {
  let result
  do {
    result = arrayShuffle(layers)
  } while (areArraysIdentical(result, layers) === true)
  return result
}

function areArraysIdentical (a, b) {
  for (const index in a) {
    if (a[index] !== b[index]) {
      return false
    }
  }
  return true
}
