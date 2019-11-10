/** @jsx h */
import { h } from 'preact'
import './button.scss'

export function Button (props) {
  return (
    <div class='button-wrapper'>
      <button class='button button--primary' {...props} />
    </div>
  )
}
