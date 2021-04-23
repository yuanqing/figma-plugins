import { Settings } from './types'

export const defaultSettings: Settings = {
  deleteHiddenLayers: true,
  pixelPerfect: true,
  skipLockedLayers: false,
  smartRenameLayers: true,
  smartRenameLayersWhitelist: '^@',
  smartSortLayers: true,
  ungroupSingleLayerGroups: true
}
