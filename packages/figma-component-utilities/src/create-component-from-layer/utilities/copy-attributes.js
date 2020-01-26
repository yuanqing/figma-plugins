const attributes = [
  'clipsContent',
  'cornerRadius',
  'blendMode',
  'effects',
  'effectStyleId',
  'exportSettings',
  'fills',
  'fillStyleId',
  'gridStyleId',
  'layoutGrids',
  'opacity',
  'strokes',
  'strokeStyleId'
]
export function copyAttributes (sourceLayer, destinationLayer) {
  for (const attribute of attributes) {
    if (typeof sourceLayer[attribute] !== 'undefined') {
      destinationLayer[attribute] = sourceLayer[attribute]
    }
  }
}
