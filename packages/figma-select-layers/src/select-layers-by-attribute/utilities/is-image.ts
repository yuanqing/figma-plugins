export function isImage(layer) {
  return (
    layer.type === 'RECTANGLE' &&
    layer.fills.length === 1 &&
    layer.fills[0].type === 'IMAGE'
  )
}
