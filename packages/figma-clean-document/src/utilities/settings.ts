import { Settings } from './types.js'

export const settingsKey = '2025-08-01'

export const defaultSettings: Settings = {
  cleanInstanceLayers: true,
  cleanLockedLayers: false,
  deleteHiddenLayers: true,
  pixelPerfect: true,
  positionCanvasAtZeroZero: true,
  smartRenameLayers: true,
  smartRenameLayersWhitelist: '^@',
  smartSortLayers: true,
  ungroupSingleLayerGroups: true
}
