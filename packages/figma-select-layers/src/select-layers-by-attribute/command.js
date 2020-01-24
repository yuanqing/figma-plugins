import { commandFactory } from './utilities/command-factory'
import { isImage } from './utilities/is-image'
import { isLayerTypeFactory } from './utilities/is-layer-type-factory'

export const selectComponents = commandFactory(
  'component',
  isLayerTypeFactory('COMPONENT'),
  function (layer) {
    // components can't be nested inside other components or instances
    return layer.type === 'COMPONENT' || layer.type === 'INSTANCE'
  }
)

export const selectInstanceLayers = commandFactory(
  'instance layer',
  isLayerTypeFactory('INSTANCE')
)

export const selectFrames = commandFactory('frame', isLayerTypeFactory('FRAME'))

export const selectGroups = commandFactory('group', isLayerTypeFactory('GROUP'))

export const selectSlices = commandFactory('slice', isLayerTypeFactory('SLICE'))

const vectorLayerTypes = [
  'BOOLEAN_OPERATION',
  'ELLIPSE',
  'LINE',
  'POLYGON',
  'RECTANGLE',
  'STAR',
  'VECTOR'
]
export const selectVectorLayers = commandFactory(
  'vector layer',
  function isVector (layer) {
    return vectorLayerTypes.includes(layer.type) && isImage(layer) === false
  },
  function (layer) {
    // don't select layers within boolean operation layers
    return layer.type === 'BOOLEAN_OPERATION'
  }
)

export const selectRectangles = commandFactory('rectangle', function (layer) {
  return layer.type === 'RECTANGLE' && isImage(layer) === false
})

export const selectLines = commandFactory('line', function (layer) {
  if (layer.type === 'LINE') {
    return true
  }
  if (layer.type !== 'VECTOR') {
    return false
  }
  if (layer.vectorNetwork.vertices.length !== 2) {
    return false
  }
  const { tangentStart, tangentEnd } = layer.vectorNetwork.segments[0]
  return (
    tangentStart.x === 0 &&
    tangentStart.y === 0 &&
    tangentEnd.x === 0 &&
    tangentEnd.y === 0
  )
})

export const selectEllipses = commandFactory(
  'ellipse',
  isLayerTypeFactory('ELLIPSE')
)

export const selectPolygons = commandFactory(
  'polygon',
  isLayerTypeFactory('POLYGON')
)

export const selectStars = commandFactory('star', isLayerTypeFactory('STAR'))

export const selectBooleanGroups = commandFactory(
  'boolean group',
  isLayerTypeFactory('BOOLEAN_OPERATION')
)

export const selectImages = commandFactory('image', isImage)

export const selectTextLayers = commandFactory(
  'text layer',
  isLayerTypeFactory('TEXT')
)

export const selectMaskLayers = commandFactory('mask layer', function (layer) {
  return layer.isMask === true
})

export const selectHiddenLayers = commandFactory('hidden layer', function (
  layer
) {
  return layer.visible === false
})

export const selectLockedLayers = commandFactory('locked layer', function (
  layer
) {
  return layer.locked === true
})

export const selectLayersWithExports = commandFactory(
  ['layer with export settings', 'layers with export settings'],
  function (layer) {
    return layer.exportSettings.length > 0
  }
)
