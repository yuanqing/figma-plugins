import { Resolution } from '../../utilities/types'

export async function exportNodeAsync(
  node: SceneNode,
  resolution: Resolution
): Promise<Uint8Array> {
  const exportSettings: ExportSettingsImage = {
    constraint: {
      type: 'SCALE',
      value: resolution
    },
    format: 'PNG'
  }
  return node.exportAsync(exportSettings)
}
