/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Up',
  icon: (
    <svg>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2 14H14V13L2 13V14ZM14 11L2 11L2 10H7.5L7.5 5.20711L5.35355 7.35355L4.64645 6.64645L7.64645 3.64645L8 3.29289L8.35355 3.64645L11.3536 6.64645L10.6464 7.35355L8.5 5.20711V10L14 10V11ZM2 3V2L14 2V3L2 3Z'
      />
    </svg>
  )
})
