export function isImage(node: BaseNode): boolean {
  if (node.type !== 'RECTANGLE') {
    return false
  }
  if (!Array.isArray(node.fills)) {
    return false
  }
  return node.fills.length === 1 && node.fills[0].type === 'IMAGE'
}
