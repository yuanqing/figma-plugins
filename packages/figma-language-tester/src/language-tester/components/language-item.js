/** @jsx h */
import { h } from 'preact'
import './language-item.scss'

export function LanguageItem ({ isActive, onClick, children }) {
  return (
    <div
      class={`language-item${isActive ? ' language-item--active' : ''}`}
      onClick={onClick}
    >
      <div class='language-item__text'>{children}</div>
      {isActive ? (
        <div class='language-item__icon'>
          <div class='icon icon--resolve icon--blue' />
        </div>
      ) : null}
    </div>
  )
}
