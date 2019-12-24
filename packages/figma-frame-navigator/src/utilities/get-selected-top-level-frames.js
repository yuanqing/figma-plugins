/* global figma */

export function getSelectedTopLevelFrames () {
  const result = {}
  for (const layer of figma.currentPage.selection) {
    const frame = resolveTopLevelFrame(layer)
    if (typeof result[frame.id] === 'undefined') {
      result[frame.id] = frame
    }
  }
  return Object.values(result)
}

function resolveTopLevelFrame (layer) {
  if (layer.parent.type === 'PAGE') {
    return layer
  }
  return resolveTopLevelFrame(layer.parent)
}
