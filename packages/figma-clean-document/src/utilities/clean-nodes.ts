import { deleteHiddenNodes } from './delete-hidden-nodes.js'
import { makePixelPerfect } from './make-pixel-perfect.js'
import { smartRenameNode } from './smart-rename-node.js'
import { ungroupSingleNodeGroup } from './ungroup-single-node-group.js'

export function cleanNodes(
  node: SceneNode,
  settings: { [key: string]: any }
): boolean {
  const {
    deleteHiddenLayers,
    pixelPerfect,
    skipLockedLayers,
    smartRenameLayers,
    smartRenameLayersWhitelistRegex,
    ungroupSingleLayerGroups
  } = settings
  if (skipLockedLayers === true && node.locked === true) {
    return false
  }
  if (node.removed === true) {
    return false
  }
  if (deleteHiddenLayers === true && deleteHiddenNodes(node) === true) {
    return true
  }
  const parent = node.parent
  if (parent === null) {
    return false
  }
  const index = parent.children.indexOf(node)
  if (
    ungroupSingleLayerGroups === true &&
    ungroupSingleNodeGroup(node) === true
  ) {
    // Recurse into the single child of `node`
    return cleanNodes(parent.children[index], settings)
  }
  let didChange = false
  if ('children' in node) {
    if (node.type === 'INSTANCE') {
      if (smartRenameLayers === true) {
        for (const child of node.children) {
          didChange =
            smartRenameNode(child, smartRenameLayersWhitelistRegex) || didChange
        }
      }
    } else {
      for (const child of node.children) {
        didChange = cleanNodes(child, settings) || didChange
      }
    }
  }
  if (
    didChange === true &&
    ungroupSingleLayerGroups === true &&
    ungroupSingleNodeGroup(node)
  ) {
    node = parent.children[index]
  }
  if (pixelPerfect === true) {
    didChange = makePixelPerfect(node) || didChange
  }
  if (smartRenameLayers === true) {
    didChange =
      smartRenameNode(node, smartRenameLayersWhitelistRegex) || didChange
  }
  return didChange
}
