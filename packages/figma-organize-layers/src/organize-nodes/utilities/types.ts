import { EventHandler } from '@create-figma-plugin/utilities'

import { GroupDefinition, Settings } from '../../utilities/types'

export type Group<T> = {
  name: null | string
  nodes: Array<T>
}

export type NodeAttributes = {
  id: string
  name: string
}

export type FormState = Settings & {
  groups: Array<Group<NodeAttributes>>
  maximumGroupDefinition: GroupDefinition
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}

export interface UpdateMainStateHandler extends EventHandler {
  name: 'UPDATE_MAIN_STATE'
  handler: (options: {
    combineSingleLayerGroups: boolean
    groupDefinition: GroupDefinition
  }) => void
}
export interface UpdateUIStateHandler extends EventHandler {
  name: 'UPDATE_UI_STATE'
  handler: (
    groups: Array<Group<NodeAttributes>>,
    maximumGroupDefinition: GroupDefinition
  ) => void
}
