/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Left',
  icon: (
    <svg>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M14 14L14 2H13L13 14H14ZM11 2L11 14H10V8.5H5.20711L7.35355 10.6464L6.64645 11.3536L3.64645 8.35355L3.29289 8L3.64645 7.64645L6.64645 4.64645L7.35355 5.35355L5.20711 7.5H10L10 2H11ZM3 14H2L2 2H3L3 14Z'
      />
    </svg>
  )
})
