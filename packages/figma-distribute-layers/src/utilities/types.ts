import { EventHandler } from '@create-figma-plugin/utilities'
import { ComponentChildren } from 'preact'

export type Direction = 'up' | 'down' | 'left' | 'right'

export type MainFactoryOptions = {
  direction: Direction
  distributeNodes: (layers: Array<SceneNode>, space: number) => void
}
export type UiFactoryOptions = {
  direction: Direction
  icon: ComponentChildren
}

export type Settings = {
  space: null | number
}
export type DistributeLayersProps = Settings & {
  hasSelection: boolean
}
export type FormState = DistributeLayersProps

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (settings: Settings) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (hasSelection: boolean) => void
}
