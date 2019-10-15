export function smartRenameLayer (layer, smartRenameLayersWhitelist) {
  const whitelistRegex =
    smartRenameLayersWhitelist !== ''
      ? new RegExp(smartRenameLayersWhitelist)
      : null
  if (layer.exportSettings.length !== 0) {
    return false
  }
  if (whitelistRegex && whitelistRegex.test(layer.name)) {
    return false
  }
  const previousName = layer.name
  switch (layer.type) {
    case 'BOOLEAN_OPERATION': {
      switch (layer.booleanOperation) {
        case 'UNION': {
          layer.name = 'Union'
          break
        }
        case 'INTERSECT': {
          layer.name = 'Intersect'
          break
        }
        case 'SUBTRACT': {
          layer.name = 'Subtract'
          break
        }
        case 'EXCLUDE': {
          layer.name = 'Exclude'
          break
        }
      }
      break
    }
    case 'ELLIPSE': {
      layer.name = 'Ellipse'
      break
    }
    case 'GROUP': {
      layer.name = 'Group'
      break
    }
    case 'INSTANCE': {
      layer.name = layer.masterComponent.name
      break
    }
    case 'POLYGON': {
      layer.name = 'Polygon'
      break
    }
    case 'RECTANGLE': {
      if (layer.fills.length === 1 && layer.fills[0].type === 'IMAGE') {
        layer.name = 'Image'
        break
      }
      layer.name = 'Rectangle'
      break
    }
    case 'STAR': {
      layer.name = 'Star'
      break
    }
    case 'TEXT': {
      layer.autoRename = true
      break
    }
    case 'VECTOR': {
      layer.name = 'Vector'
      break
    }
  }
  if (layer.name !== previousName) {
    return true
  }
  return false
}
