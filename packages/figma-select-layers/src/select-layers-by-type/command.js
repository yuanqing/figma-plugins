import { commandFactory } from './command-factory'

export const component = commandFactory(
  filterByTypeFactory('COMPONENT'),
  'component'
)
export const instance = commandFactory(
  filterByTypeFactory('INSTANCE'),
  'instance'
)
export const frame = commandFactory(filterByTypeFactory('FRAME'), 'frame')
export const group = commandFactory(filterByTypeFactory('GROUP'), 'group')
export const slice = commandFactory(filterByTypeFactory('SLICE'), 'slice')
export const rectangle = commandFactory(
  filterByTypeFactory('RECTANGLE'),
  'rectangle'
)
export const line = commandFactory(filterByTypeFactory('LINE'), 'line')
export const ellipse = commandFactory(filterByTypeFactory('ELLIPSE'), 'ellipse')
export const polygon = commandFactory(filterByTypeFactory('POLYGON'), 'polygon')
export const star = commandFactory(filterByTypeFactory('STAR'), 'star')
export const vector = commandFactory(filterByTypeFactory('VECTOR'), 'vector')
export const booleanOperation = commandFactory(
  filterByTypeFactory('BOOLEAN_OPERATION'),
  'boolean operation'
)
export const image = commandFactory(filterImages, 'image')
export const text = commandFactory(filterByTypeFactory('TEXT'), 'text')

export const locked = commandFactory(filterLocked, 'locked')
export const hidden = commandFactory(filterHidden, 'hidden')

function filterByTypeFactory (type) {
  return function (layer) {
    return layer.type === type
  }
}

function filterImages (layer) {
  return (
    layer.type === 'RECTANGLE' &&
    layer.fills.length === 1 &&
    layer.fills[0].type === 'IMAGE'
  )
}

function filterLocked (layer) {
  return layer.locked === true
}

function filterHidden (layer) {
  return layer.visible === false
}
