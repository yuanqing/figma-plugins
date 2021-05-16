import { EventHandler } from '@create-figma-plugin/utilities'

import { Settings } from '../../utilities/types.js'

export type NodeAttributes = Settings['selectSimilarNodes']

export type NormalizedNodeAttributeItem = {
  categoryKey: null | string
  disabled: boolean
  nodeAttributeKey: keyof NodeAttributes
  value: boolean
}

export type SelectSimilarNodesSettings = NodeAttributes
export type SelectSimilarNodesProps = {
  nodeAttributes: NodeAttributes
  validNodeAttributeKeys: Array<keyof NodeAttributes>
}
export type FormState = SelectSimilarNodesProps & {
  searchTerm: string
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings['selectSimilarNodes']) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (validNodeAttributeKeys: Array<keyof NodeAttributes>) => void
}
