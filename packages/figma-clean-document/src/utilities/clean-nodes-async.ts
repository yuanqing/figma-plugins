import { deleteHiddenNodes } from './delete-hidden-nodes.js'
import { makePixelPerfect } from './make-pixel-perfect.js'
import { positionAllNodesAtZeroZero } from './position-all-nodes-at-zero-zero.js'
import { smartRenameNodeAsync } from './smart-rename-node-async.js'
import { ungroupSingleNodeGroup } from './ungroup-single-node-group.js'

export async function cleanNodesAsync(
  node: SceneNode,
  settings: {
    cleanInstanceLayers: boolean
    cleanLockedLayers: boolean
    deleteHiddenLayers: boolean
    pixelPerfect: boolean
    positionCanvasAtZeroZero: boolean
    smartRenameLayers: boolean
    smartRenameLayersWhitelistRegex: null | RegExp
    ungroupSingleLayerGroups: boolean
  }
): Promise<boolean> {
  const {
    cleanInstanceLayers,
    cleanLockedLayers,
    deleteHiddenLayers,
    pixelPerfect,
    positionCanvasAtZeroZero,
    smartRenameLayers,
    smartRenameLayersWhitelistRegex,
    ungroupSingleLayerGroups
  } = settings
  if (cleanInstanceLayers === false && node.type === 'INSTANCE') {
    return false
  }
  if (cleanLockedLayers === false && node.locked === true) {
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
    return cleanNodesAsync(parent.children[index], settings)
  }
  let didChange = false
  if ('children' in node) {
    if (node.type === 'INSTANCE') {
      if (smartRenameLayers === true) {
        for (const child of node.children) {
          didChange =
            (await smartRenameNodeAsync(
              child,
              smartRenameLayersWhitelistRegex
            )) || didChange
        }
      }
    } else {
      for (const child of node.children) {
        didChange = (await cleanNodesAsync(child, settings)) || didChange
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
      (await smartRenameNodeAsync(node, smartRenameLayersWhitelistRegex)) ||
      didChange
  }
  if (positionCanvasAtZeroZero === true) {
    didChange = positionAllNodesAtZeroZero() || didChange
  }
  return didChange
}
