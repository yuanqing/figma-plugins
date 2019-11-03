/** @jsx h */
import { h } from 'preact'
import './button.scss'

export function Button ({ type, ...rest }) {
  return <button class={`button button--${type}`} {...rest} />
}
