export function isImage(layer: BaseNode) {
  return (
    layer.type === 'RECTANGLE' &&
    (layer.fills as ReadonlyArray<Paint>).length === 1 &&
    layer.fills[0].type === 'IMAGE'
  )
}
