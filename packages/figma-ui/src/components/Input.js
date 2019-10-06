/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './Input.scss'

export function Input ({ border, focused, onChange, ...rest }) {
  if (focused) {
    rest.ref = useRef(null)
    useEffect(function () {
      const layer = rest.ref.current
      layer.focus()
      layer.select()
    }, [])
  }
  return (
    <input
      {...rest}
      class={`input ${border ? 'input--border' : ''}`}
      onChange={onChange}
    />
  )
}
