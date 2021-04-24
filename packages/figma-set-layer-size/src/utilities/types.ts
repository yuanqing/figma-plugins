import { EventHandler } from '@create-figma-plugin/utilities'

export type Dimensions = {
  width: null | number
  height: null | number
}

export type Settings = {
  resizeWithConstraints: boolean
}
export type FormState = Settings & Dimensions

export interface CloseUIHandler extends EventHandler {
  name: 'CLOSE_UI'
  handler: () => void
}
export interface SubmitHandler extends EventHandler {
  name: 'SUBMIT'
  handler: (props: FormState) => void
}
export interface SelectionChangedHandler extends EventHandler {
  name: 'SELECTION_CHANGED'
  handler: (dimensions: Dimensions) => void
}
