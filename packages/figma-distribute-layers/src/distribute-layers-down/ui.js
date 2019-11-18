/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Down',
  icon: (
    <svg>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14 2L2 2V3L14 3V2ZM2 5L14 5V6H8.5V10.7929L10.6464 8.64645L11.3536 9.35355L8.35355 12.3536L8 12.7071L7.64645 12.3536L4.64645 9.35355L5.35355 8.64645L7.5 10.7929L7.5 6L2 6V5ZM14 13V14L2 14V13L14 13Z'
      />
    </svg>
  )
})
