/** @jsx h */
import { h } from 'preact'
import { uiFactory } from '../ui-factory'

export default uiFactory({
  direction: 'Right',
  icon: (
    <svg>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M2 2V14H3L3 2H2ZM5 14L5 2H6V7.5H10.7929L8.64645 5.35355L9.35355 4.64645L12.3536 7.64645L12.7071 8L12.3536 8.35355L9.35355 11.3536L8.64645 10.6464L10.7929 8.5H6L6 14H5ZM13 2H14L14 14H13L13 2Z'
      />
    </svg>
  )
})
