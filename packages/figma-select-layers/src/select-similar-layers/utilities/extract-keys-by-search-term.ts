import { labels } from './labels'

export function extractKeysBySearchTerm(attributes, searchTerm) {
  let result = []
  for (const key in attributes) {
    const object = attributes[key]
    if (
      containsSearchTerm(key, searchTerm) === true ||
      containsSearchTerm(labels[key], searchTerm) === true
    ) {
      result.push(key)
      if (typeof object === 'object') {
        result = result.concat(Object.keys(object))
      }
      continue
    }
    if (typeof object === 'object') {
      const childResult = extractKeysBySearchTerm(object, searchTerm)
      if (childResult.length > 0) {
        result.push(key)
        result = result.concat(childResult)
      }
    }
  }
  return result
}

function containsSearchTerm(string, searchTerm) {
  return string.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
}
