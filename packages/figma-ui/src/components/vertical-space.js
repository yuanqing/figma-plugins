/** @jsx h */
import { h } from 'preact'
import './vertical-space.scss'

export function VerticalSpace ({ size, ...rest }) {
  return <div {...rest} class={`vertical-space vertical-space--${size}`} />
}
