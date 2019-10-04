/** @jsx h */
import { h, render as preactRender } from 'preact'
import 'figma-plugin-ds/figma-plugin-ds.min.css'

export function render (Plugin, props) {
  return function (rootNode, data) {
    preactRender(<Plugin {...data} {...props} />, rootNode)
  }
}
