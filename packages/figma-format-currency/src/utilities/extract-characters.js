export function extractCharacters (layers) {
  return layers.map(function ({ id, characters }) {
    return { id, characters }
  })
}
