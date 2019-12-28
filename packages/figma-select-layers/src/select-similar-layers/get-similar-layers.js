import { compareObjects, traverseLayer } from '@create-figma-plugin/utilities'

export function getSimilarLayers (referenceLayer) {
  const result = []
  const type = referenceLayer.type
  if (type === 'SLICE' || type === 'GROUP') {
    traverseLayer(figma.currentPage, function (layer) {
      if (layer.type === type && layer.id !== referenceLayer.id) {
        result.push(layer)
      }
    })
    return result
  }
  if (type === 'COMPONENT' || type === 'INSTANCE') {
    const masterComponentId =
      type === 'INSTANCE'
        ? referenceLayer.masterComponent.id
        : referenceLayer.id
    traverseLayer(figma.currentPage, function (layer) {
      if (
        ((layer.type === 'COMPONENT' && layer.id === masterComponentId) ||
          (layer.type === 'INSTANCE' &&
            layer.masterComponent.id === masterComponentId)) &&
        layer.id !== referenceLayer.id
      ) {
        result.push(layer)
      }
    })
    return result
  }
  traverseLayer(figma.currentPage, function (layer) {
    if (layer.type === 'PAGE') {
      return
    }
    if (
      compareAttributes(referenceLayer, layer) === true &&
      layer.id !== referenceLayer.id
    ) {
      result.push(layer)
    }
  })
  return result
}

const attributes = [
  'blendMode',
  'bottomLeftRadius',
  'bottomRightRadius',
  'dashPattern',
  'effects',
  'effectsStyleId',
  'fills',
  'fillsStyleId',
  'fontName',
  'fontSize',
  'letterSpacing',
  'lineHeight',
  'opacity',
  'paragraphIndent',
  'paragraphSpacing',
  'strokeAlign',
  'strokeCap',
  'strokeJoin',
  'strokes',
  'strokesStyleId',
  'strokeWeight',
  'textAlignHorizontal',
  'textAlignVertical',
  'textCase',
  'textDecoration',
  'textStyleId',
  'topLeftRadius',
  'topRightRadius'
]

export function compareAttributes (a, b) {
  for (const attribute of attributes) {
    if (compareObjects(a[attribute], b[attribute]) === false) {
      return false
    }
  }
  return true
}
