const ATTRIBUTES = ['height', 'width', 'x', 'y']

export function makePixelPerfect (layer) {
  if (layer.type === 'GROUP') {
    return false
  }
  let didChange = false
  for (const attribute of ATTRIBUTES) {
    if (Number.isInteger(layer[attribute]) === false) {
      layer[attribute] = Math.round(layer[attribute])
      didChange = true
    }
  }
  return didChange
}
