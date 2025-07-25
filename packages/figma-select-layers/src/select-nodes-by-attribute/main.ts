import { isImage } from './utilities/is-image.js'
import { isNodeTypeFactory } from './utilities/is-node-type-factory.js'
import { mainFactory } from './utilities/main-factory.js'

export const selectComponents = mainFactory(
  'component',
  isNodeTypeFactory('COMPONENT'),
  function (node: SceneNode) {
    // components can't be nested inside other components or instances
    return node.type === 'COMPONENT' || node.type === 'INSTANCE'
  }
)

export const selectSections = mainFactory(
  'section',
  isNodeTypeFactory('SECTION'),
  function (node: SceneNode) {
    return node.parent !== null && node.parent.type !== 'PAGE'
  }
)

export const selectVariants = mainFactory(
  'variant',
  isNodeTypeFactory('COMPONENT_SET'),
  function (layer: SceneNode) {
    // variants can't be nested inside other components, variants or instances
    return (
      layer.type === 'COMPONENT' ||
      layer.type === 'COMPONENT_SET' ||
      layer.type === 'INSTANCE'
    )
  }
)

export const selectInstanceLayers = mainFactory(
  'instance layer',
  isNodeTypeFactory('INSTANCE')
)

export const selectFrames = mainFactory('frame', isNodeTypeFactory('FRAME'))

export const selectGroups = mainFactory('group', isNodeTypeFactory('GROUP'))

export const selectSlices = mainFactory('slice', isNodeTypeFactory('SLICE'))

const vectorLayerTypes = [
  'BOOLEAN_OPERATION',
  'ELLIPSE',
  'LINE',
  'POLYGON',
  'RECTANGLE',
  'STAR',
  'VECTOR'
]
export const selectVectorLayers = mainFactory(
  'vector layer',
  function isVector(node: SceneNode) {
    return vectorLayerTypes.includes(node.type) && isImage(node) === false
  },
  function (node: SceneNode) {
    // don't select layers within boolean operation layers
    return node.type === 'BOOLEAN_OPERATION'
  }
)

export const selectRectangles = mainFactory(
  'rectangle',
  function (node: SceneNode) {
    return node.type === 'RECTANGLE' && isImage(node) === false
  }
)

export const selectLines = mainFactory('line', function (node: SceneNode) {
  if (node.type === 'LINE') {
    return true
  }
  if (node.type !== 'VECTOR') {
    return false
  }
  if (node.vectorNetwork.vertices.length !== 2) {
    return false
  }
  const { tangentStart, tangentEnd } = node.vectorNetwork.segments[0]
  return (
    typeof tangentStart !== 'undefined' &&
    tangentStart.x === 0 &&
    tangentStart.y === 0 &&
    typeof tangentEnd !== 'undefined' &&
    tangentEnd.x === 0 &&
    tangentEnd.y === 0
  )
})

export const selectEllipses = mainFactory(
  'ellipse',
  isNodeTypeFactory('ELLIPSE')
)

export const selectPolygons = mainFactory(
  'polygon',
  isNodeTypeFactory('POLYGON')
)

export const selectStars = mainFactory('star', isNodeTypeFactory('STAR'))

export const selectBooleanGroups = mainFactory(
  'boolean group',
  isNodeTypeFactory('BOOLEAN_OPERATION')
)

export const selectImages = mainFactory('image', isImage)

export const selectTextLayers = mainFactory(
  'text layer',
  isNodeTypeFactory('TEXT')
)

export const selectMaskLayers = mainFactory(
  'mask layer',
  function (node: SceneNode) {
    return node.type !== 'SLICE' && 'isMask' in node && node.isMask === true
  }
)

export const selectHiddenLayers = mainFactory(
  'hidden layer',
  function (node: SceneNode) {
    return node.visible === false
  }
)

export const selectLockedLayers = mainFactory(
  'locked layer',
  function (node: SceneNode) {
    return node.locked === true
  }
)

export const selectLayersWithExports = mainFactory(
  ['layer with export settings', 'layers with export settings'],
  function (node: SceneNode) {
    return node.type !== 'WIDGET' && node.exportSettings.length > 0
  }
)
