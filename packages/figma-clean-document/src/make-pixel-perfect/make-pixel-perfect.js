const ATTRIBUTES = ['height', 'width', 'x', 'y']

export function makePixelPerfect (layer) {
  let didChange = false
  for (const attribute of ATTRIBUTES) {
    if (Number.isInteger(layer[attribute]) === false) {
      layer[attribute] = Math.round(layer[attribute])
      didChange = true
    }
  }
  return didChange
}
