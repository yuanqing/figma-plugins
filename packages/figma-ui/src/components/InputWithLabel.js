/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './InputWithLabel.scss'

export function InputWithLabel ({ border, focused, label, name, ...rest }) {
  if (focused) {
    rest.ref = useRef(null)
    useEffect(function () {
      const layer = rest.ref.current
      layer.focus()
      layer.select()
    }, [])
  }
  return (
    <div class='input-label'>
      <label class='input-label__label' for={name}>
        {label}
      </label>
      <input
        class={`input input-label__input ${
          border ? 'input-label__input--border' : ''
        }`}
        name={name}
        id={name}
        {...rest}
      />
    </div>
  )
}
