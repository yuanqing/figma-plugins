import { extractKeys } from './extract-keys'
import { labels } from './labels'

export function extractKeysBySearchTerm (attributes, searchTerm) {
  return extractKeys(attributes, function (key) {
    return (
      containsSearchTerm(key, searchTerm) === true ||
      containsSearchTerm(labels[key], searchTerm) === true
    )
  })
}

function containsSearchTerm (string, searchTerm) {
  return string.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
}
