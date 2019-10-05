/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './Input.scss'

export function Input ({ focused, ...rest }) {
  if (focused) {
    rest.ref = useRef(null)
    useEffect(function () {
      const node = rest.ref.current
      node.focus()
      node.select()
    }, [])
  }
  return <input class='input input--reset' {...rest} />
}
