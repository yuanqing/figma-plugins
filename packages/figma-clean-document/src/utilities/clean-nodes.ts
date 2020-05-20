import { deleteHiddenNodes } from './delete-hidden-nodes'
import { makePixelPerfect } from './make-pixel-perfect'
import { smartRenameNode } from './smart-rename-node'
import { ungroupSingleNodeGroup } from './ungroup-single-node-group'

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
  if (
    ungroupSingleLayerGroups === true &&
    ungroupSingleNodeGroup(node) === true
  ) {
    return true
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
  if (pixelPerfect === true) {
    didChange = makePixelPerfect(node) || didChange
  }
  if (smartRenameLayers === true) {
    didChange =
      smartRenameNode(node, smartRenameLayersWhitelistRegex) || didChange
  }
  return didChange
}
