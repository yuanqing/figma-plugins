/** @jsx h */
import { h, render as preactRender } from 'preact'
import 'figma-plugin-ds/figma-plugin-ds.min.css'

export function render (Plugin) {
  return function (rootNode, data) {
    preactRender(<Plugin {...data} />, rootNode)
  }
}
