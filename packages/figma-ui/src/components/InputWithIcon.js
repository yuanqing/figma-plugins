/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './InputWithIcon.scss'

export function InputWithIcon ({
  border,
  iconColor,
  iconName,
  focused,
  ...rest
}) {
  if (focused === true) {
    rest.ref = useRef(null)
    useEffect(function () {
      const layer = rest.ref.current
      layer.focus()
      layer.select()
    }, [])
  }
  return (
    <div class='input-icon'>
      <div class='input-icon__icon'>
        <div class={`icon icon--${iconName} icon--${iconColor}`} />
      </div>
      <input
        class={`input-icon__input ${
          border === true ? 'input-icon__input--border' : ''
        }`}
        {...rest}
      />
    </div>
  )
}
