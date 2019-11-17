/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Down',
  icon: (
    <svg width='12' height='10'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M12 0H0v1h12V0zM0 3h12v1H0V3zm12 3H0v1h12V6zm0 3H0v1h12V9z'
      />
    </svg>
  )
})
