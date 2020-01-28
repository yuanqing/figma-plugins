export function smartRenameLayer (layer, whitelistRegex) {
  if (layer.exportSettings.length !== 0) {
    return false
  }
  if (whitelistRegex !== null && whitelistRegex.test(layer.name) === true) {
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
    case 'FRAME': {
      if (layer.parent.type !== 'PAGE') {
        layer.name = 'Frame'
      }
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
    case 'LINE': {
      layer.name = 'Line'
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
      if (layer.characters.length > 0) {
        layer.autoRename = true
      }
      break
    }
    case 'VECTOR': {
      const segments = layer.vectorNetwork.segments
      if (segments.length === 1) {
        const { tangentStart, tangentEnd } = segments[0]
        if (
          tangentStart.x === 0 &&
          tangentStart.y === 0 &&
          tangentEnd.x === 0 &&
          tangentEnd.y === 0
        ) {
          layer.name = 'Line'
          break
        }
      }
      layer.name = 'Vector'
      break
    }
  }
  if (layer.name !== previousName) {
    return true
  }
  return false
}
