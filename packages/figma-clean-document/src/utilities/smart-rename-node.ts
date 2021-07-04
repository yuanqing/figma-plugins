export function smartRenameNode(
  node: SceneNode,
  whitelistRegex: null | RegExp
): boolean {
  if (node.exportSettings.length !== 0) {
    return false
  }
  if (whitelistRegex !== null && whitelistRegex.test(node.name) === true) {
    return false
  }
  const previousName = node.name
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
    case 'FRAME': {
      if (node.parent !== null && node.parent.type !== 'PAGE') {
        if (node.layoutMode === 'HORIZONTAL') {
          node.name = 'Auto Layout Horizontal'
          break
        }
        if (node.layoutMode === 'VERTICAL') {
          node.name = 'Auto Layout Vertical'
          break
        }
        node.name = 'Frame'
      }
      break
    }
    case 'GROUP': {
      if ('isMask' in node.children[0] && node.children[0].isMask === true) {
        node.name = 'Mask Group'
        break
      }
      node.name = 'Group'
      break
    }
    case 'INSTANCE': {
      if (node.mainComponent !== null) {
        node.name = node.mainComponent.name
      }
      break
    }
    case 'LINE': {
      node.name = 'Line'
      break
    }
    case 'POLYGON': {
      node.name = 'Polygon'
      break
    }
    case 'RECTANGLE': {
      if (node.isMask === true) {
        node.name = 'Mask'
        break
      }
      const fills = node.fills as Array<Paint>
      if (fills.length === 1 && fills[0].type === 'IMAGE') {
        node.name = 'Image'
        break
      }
      node.name = 'Rectangle'
      break
    }
    case 'STAR': {
      node.name = 'Star'
      break
    }
    case 'TEXT': {
      if (node.characters.length > 0) {
        node.autoRename = true
      }
      break
    }
    case 'VECTOR': {
      const segments = node.vectorNetwork.segments
      if (segments.length === 1) {
        const { tangentStart, tangentEnd } = segments[0]
        if (
          typeof tangentStart !== 'undefined' &&
          tangentStart.x === 0 &&
          tangentStart.y === 0 &&
          typeof tangentEnd !== 'undefined' &&
          tangentEnd.x === 0 &&
          tangentEnd.y === 0
        ) {
          node.name = 'Line'
          break
        }
      }
      node.name = 'Vector'
      break
    }
  }
  if (node.name !== previousName) {
    return true
  }
  return false
}
