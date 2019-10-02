/** @jsx h */
import { h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import './InputWithIcon.scss'

export function InputWithIcon ({
  children,
  iconColor,
  iconName,
  type,
  focused,
  ...rest
}) {
  if (focused) {
    rest.ref = useRef(null)
    useEffect(function () {
      const node = rest.ref.current
      node.focus()
      node.select()
    }, [])
  }
  return (
    <div class='input-icon'>
      <div class='input-icon__icon'>
        <div class={`icon icon--${iconName} icon--${iconColor}`} />
      </div>
      <input
        type={type}
        class='input-icon__input input-icon--reset'
        value={children}
        {...rest}
      />
    </div>
  )
}
