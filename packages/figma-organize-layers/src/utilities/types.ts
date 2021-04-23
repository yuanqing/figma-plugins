export type GroupDefinition = 1 | 2 | 3 | 4 | 5

export type PreviewSettings = {
  combineSingleLayerGroups: boolean
  groupDefinition: GroupDefinition
}

export type Settings = PreviewSettings & {
  horizontalSpace: null | number
  verticalSpace: null | number
}
