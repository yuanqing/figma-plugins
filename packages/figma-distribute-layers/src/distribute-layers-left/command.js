import {
  getAbsolutePosition,
  setAbsoluteX
} from '@create-figma-plugin/utilities'
import { commandFactory } from '../command-factory'

export default commandFactory({
  direction: 'left',
  sortLayers: function (a, b) {
    const aAbsolute = getAbsolutePosition(a)
    const bAbsolute = getAbsolutePosition(b)
    const difference = aAbsolute.x - bAbsolute.x
    return difference !== 0 ? difference : aAbsolute.y - bAbsolute.y
  },
  distributeLayers: function (layers, space) {
    let x = null
    for (const layer of layers) {
      if (x === null) {
        x = layer.absoluteTransform[0][2] + layer.width + space
        continue
      }
      setAbsoluteX(layer, x)
      x = x + layer.width + space
    }
  }
})
