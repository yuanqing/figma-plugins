import { EventHandler } from '@create-figma-plugin/utilities'

export type ComponentNodeAttributes = {
  id: string
  name: string
  pageName: string
}
export type NodeAttributes = {
  id: string
  name: string
}

export type Settings = {
  shouldResizeToFitNode: boolean
}
export type ReplaceWithComponentProps = Settings & {
  componentNodes: Array<ComponentNodeAttributes>
  selectedNodes: Array<NodeAttributes>
}
export type FormState = ReplaceWithComponentProps & {
  componentId: null | string
  searchTerm: string
}

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (options: {
    componentId: string
    shouldResizeToFitNode: boolean
  }) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (options: {
    componentNodes: Array<ComponentNodeAttributes>
    selectedNodes: Array<NodeAttributes>
  }) => void
}
