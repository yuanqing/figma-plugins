import { commandFactory } from '../command-factory'
import { checkLayerType } from './check-layer-type'

export const selectComponents = commandFactory(
  'component',
  checkLayerType.component,
  function (layer) {
    // components can't be nested inside other components or instances
    return layer.type === 'COMPONENT' || layer.type === 'INSTANCE'
  }
)
export const selectInstanceLayers = commandFactory(
  'instance layer',
  checkLayerType.instanceLayer
)
export const selectFrames = commandFactory('frame', checkLayerType.frame)
export const selectGroups = commandFactory('group', checkLayerType.group)
export const selectSlices = commandFactory('slice', checkLayerType.slice)
export const selectVectorLayers = commandFactory(
  'vector layer',
  checkLayerType.vectorLayer
)
export const selectRectangles = commandFactory(
  'rectangle',
  checkLayerType.rectangle
)
export const selectLines = commandFactory('line', checkLayerType.line)
export const selectEllipses = commandFactory('ellipse', checkLayerType.ellipse)
export const selectPolygons = commandFactory('polygon', checkLayerType.polygon)
export const selectStars = commandFactory('star', checkLayerType.star)
export const selectBooleanGroups = commandFactory(
  'boolean group',
  checkLayerType.booleanGroup
)
export const selectImages = commandFactory('image', checkLayerType.image)
export const selectTextLayers = commandFactory(
  'text layer',
  checkLayerType.textLayer
)
