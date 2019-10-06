export const sortLayersByXPosition = factory('x')
export const sortLayersByYPosition = factory('y')

function factory (key) {
  return function (layers) {
    return [].concat(layers).sort(function (a, b) {
      return a[key] - b[key]
    })
  }
}
