export default function (node) {
  switch (node.type) {
    case 'BOOLEAN_OPERATION': {
      switch (node.booleanOperation) {
        case 'UNION': {
          node.name = 'Union'
          break
        }
        case 'INTERSECT': {
          node.name = 'Intersect'
          break
        }
        case 'SUBTRACT': {
          node.name = 'Subtract'
          break
        }
        case 'EXCLUDE': {
          node.name = 'Exclude'
          break
        }
      }
      break
    }
    case 'ELLIPSE': {
      node.name = 'Ellipse'
      break
    }
    case 'GROUP': {
      node.name = 'Group'
      break
    }
    case 'INSTANCE': {
      node.name = node.masterComponent.name
      break
    }
    case 'POLYGON': {
      node.name = 'Polygon'
      break
    }
    case 'RECTANGLE': {
      if (node.fills.length === 1 && node.fills[0].type === 'IMAGE') {
        node.name = 'Image'
        return
      }
      node.name = 'Rectangle'
      break
    }
    case 'STAR': {
      node.name = 'Star'
      break
    }
    case 'TEXT': {
      node.autoRename = true
      break
    }
    case 'VECTOR': {
      node.name = 'Vector'
      break
    }
  }
}
