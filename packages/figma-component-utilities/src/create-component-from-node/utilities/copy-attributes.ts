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

export function copyAttributes(
  sourceNode: SceneNode,
  destinationNode: SceneNode
): void {
  for (const attribute of attributes) {
    const value = (sourceNode as any)[attribute]
    if (typeof value !== 'undefined') {
      ;(destinationNode as any)[attribute] = value
    }
  }
}
