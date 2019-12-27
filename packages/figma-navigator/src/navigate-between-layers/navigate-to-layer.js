/* global figma */

export function navigateToLayer (layer) {
  const page = resolveLayerPage(layer)
  if (figma.currentPage !== page) {
    figma.currentPage = page
  }
  figma.viewport.scrollAndZoomIntoView([layer])
}

function resolveLayerPage (layer) {
  if (layer.type === 'PAGE') {
    return layer
  }
  return resolveLayerPage(layer.parent)
}
