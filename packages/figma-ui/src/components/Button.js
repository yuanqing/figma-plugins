/** @jsx h */
import { h } from 'preact'
import './Button.scss'

export function Button ({ type, ...rest }) {
  return (
    <button class={`button button--${type} button--full-width`} {...rest} />
  )
}
