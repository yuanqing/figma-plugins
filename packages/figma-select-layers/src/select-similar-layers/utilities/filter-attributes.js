export function filterAttributes (attributes, labels, searchTerm) {
  const result = {}
  for (const key in attributes) {
    const value = attributes[key]
    if (
      containsSearchTerm(key, searchTerm) === true ||
      containsSearchTerm(labels[key], searchTerm) === true
    ) {
      result[key] = value
      continue
    }
    if (typeof value === 'object') {
      const childResult = filterAttributes(value, labels, searchTerm)
      if (childResult !== null) {
        result[key] = childResult
      }
    }
  }
  if (Object.keys(result).length === 0) {
    return null
  }
  return result
}

function containsSearchTerm (string, searchTerm) {
  return string.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
}
