/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './Input.scss'

export function Input ({ children, type, focused, ...rest }) {
  if (focused) {
    rest.ref = useRef(null)
    useEffect(function () {
      const node = rest.ref.current
      node.focus()
      node.select()
    }, [])
  }
  return (
    <input type={type} class='input input-reset' value={children} {...rest} />
  )
}
