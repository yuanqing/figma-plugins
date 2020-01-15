export const checkLayerType = {
  component: factory('COMPONENT'),
  instanceLayer: factory('INSTANCE'),
  frame: factory('FRAME'),
  group: factory('GROUP'),
  slice: factory('SLICE'),
  vectorLayer: isVector,
  rectangle: factory('RECTANGLE'),
  line: isLine,
  ellipse: factory('ELLIPSE'),
  polygon: factory('POLYGON'),
  star: factory('STAR'),
  booleanGroup: factory('BOOLEAN_OPERATION'),
  image: isImage,
  textLayer: factory('TEXT')
}

function factory (type) {
  return function (layer) {
    return layer.type === type
  }
}

const vectorLayerTypes = [
  'ELLIPSE',
  'LINE',
  'POLYGON',
  'RECTANGLE',
  'STAR',
  'VECTOR'
]
function isVector (layer) {
  return vectorLayerTypes.indexOf(layer.type) !== -1
}

function isLine (layer) {
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
}

function isImage (layer) {
  return (
    layer.type === 'RECTANGLE' &&
    layer.fills.length === 1 &&
    layer.fills[0].type === 'IMAGE'
  )
}
