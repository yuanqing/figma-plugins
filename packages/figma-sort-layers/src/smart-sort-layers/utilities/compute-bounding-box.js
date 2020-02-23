import { computeBoundingBox as helper } from '@create-figma-plugin/utilities'
import mem from 'mem'

const memoized = mem(function (id, layer) {
  return helper(layer)
})

export function computeBoundingBox (layer) {
  if (layer.rotation === 0) {
    return layer
  }
  return memoized(layer.id, layer)
}
