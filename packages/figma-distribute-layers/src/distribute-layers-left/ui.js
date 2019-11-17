/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Left',
  icon: (
    <svg width='10' height='12'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M1 0H0v12h1V0zm2 0h1v12H3V0zm4 0H6v12h1V0zm3 0H9v12h1V0z'
      />
    </svg>
  )
})
