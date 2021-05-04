import { Settings } from './types'

export const settingsKey = '2021-05-01'

export const defaultSettings: Settings = {
  deleteHiddenLayers: true,
  pixelPerfect: true,
  skipLockedLayers: false,
  smartRenameLayers: true,
  smartRenameLayersWhitelist: '^@',
  smartSortLayers: true,
  ungroupSingleLayerGroups: true
}
