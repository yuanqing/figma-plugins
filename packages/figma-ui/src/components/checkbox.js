/** @jsx h */
import { h } from 'preact'
import './checkbox.scss'

export function Checkbox ({ title, description, name, value, ...rest }) {
  return (
    <div class='checkbox'>
      <input
        {...rest}
        class='checkbox__box'
        type='checkbox'
        id={name}
        name={name}
        checked={value}
      />
      <label class='checkbox__label' for={name}>
        <div class='checkbox__text'>
          <div class='checkbox__title'>{title}</div>
          {description && (
            <div class='checkbox__description'>{description}</div>
          )}
        </div>
      </label>
    </div>
  )
}
