module.exports = function (object) {
  const sortedKeys = Object.keys(object).sort()
  const result = {}
  for (const key of sortedKeys) {
    result[key] = object[key]
  }
  return result
}
