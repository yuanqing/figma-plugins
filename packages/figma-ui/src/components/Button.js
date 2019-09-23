/** @jsx h */
import { h } from 'preact'

export function Button ({ children, type, ...rest }) {
  return (
    <button class={`button button--${type} w-100`} {...rest}>
      {children}
    </button>
  )
}
